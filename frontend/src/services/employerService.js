import api from './api';

export const getEmployerProfile = async () => {
  const res = await api.get('/employer/profile');
  return res.data;
};

export const saveEmployerProfile = async (data) => {
  const res = await api.post('/employer/profile', data);
  return res.data;
};

export const completeEmployerOnboarding = async (data) => {
  const res = await api.post('/employer/onboarding', data);
  return res.data;
};

export const updateEmployerProfile = (data) =>
  api.put('/employer/profile', data);
