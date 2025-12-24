import api from './api.js';

export const signup = async (email, password, role, firstName, lastName) => {
  const response = await api.post('/auth/signup', {
    email,
    password,
    role,
    firstName,
    lastName,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};
