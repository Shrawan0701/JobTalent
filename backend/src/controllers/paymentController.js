import { query } from '../config/database.js';
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_PRICES } from '../config/constants.js';

export const createSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;
    
    if (!Object.values(SUBSCRIPTION_PLANS).includes(plan)) {
      return res.status(400).json({ message: 'Invalid plan' });
    }
    
    const planConfig = SUBSCRIPTION_PRICES[plan];
    
    if (!planConfig) {
      return res.status(400).json({ message: 'Plan not available' });
    }
    
    // For demo: create mock order
    const orderId = 'order_' + Date.now();
    
    const paymentResult = await query(
      'INSERT INTO payments (user_id, razorpay_order_id, amount, currency, plan, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [userId, orderId, planConfig.amount, planConfig.currency, plan, 'pending']
    );
    
    res.status(201).json({
      message: 'Order created',
      order: {
        id: orderId,
        amount: planConfig.amount,
        currency: planConfig.currency,
        paymentId: paymentResult.rows[0].id,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.body;
    const userId = req.user.id;
    
    const paymentResult = await query(
      'SELECT * FROM payments WHERE id = $1 AND user_id = $2',
      [paymentId, userId]
    );
    
    if (paymentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    const payment = paymentResult.rows[0];
    
    await query(
      'UPDATE payments SET status = $1, verified_at = NOW() WHERE id = $2',
      ['success', paymentId]
    );
    
    const subscriptionResult = await query(
      'INSERT INTO subscriptions (user_id, plan, status, start_date, end_date, created_at) VALUES ($1, $2, $3, NOW(), NOW() + INTERVAL \'1 month\', NOW()) RETURNING *',
      [userId, payment.plan, 'active']
    );
    
    res.json({
      message: 'Payment verified and subscription activated',
      subscription: subscriptionResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const result = await query(
      'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.json({
        subscription: null,
        plan: SUBSCRIPTION_PLANS.FREE
      });
    }
    
    const subscription = result.rows[0];
    const isExpired = new Date(subscription.end_date) < new Date();
    
    res.json({
      subscription,
      plan: isExpired ? SUBSCRIPTION_PLANS.FREE : subscription.plan
    });
  } catch (error) {
    next(error);
  }
};
