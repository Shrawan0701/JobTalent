import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-subscription', authMiddleware, paymentController.createSubscription);
router.post('/verify', authMiddleware, paymentController.verifyPayment);
router.get('/subscription', authMiddleware, paymentController.getSubscription);

export default router;
