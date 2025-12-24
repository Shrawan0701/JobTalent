import api from './api.js';

export const createSubscription = async (plan) => {
  const response = await api.post('/payments/create-subscription', { plan });
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post('/payments/verify', paymentData);
  return response.data;
};

export const getSubscription = async () => {
  const response = await api.get('/payments/subscription');
  return response.data;
};
