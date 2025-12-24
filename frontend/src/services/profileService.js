import api from './api.js';

export const getTalentProfile = async () => {
  const response = await api.get('/profile/talent');
  return response.data;
};

export const updateTalentProfile = async (profileData) => {
  const response = await api.put('/profile/talent', profileData);
  return response.data;
};

export const getCompanyProfile = async () => {
  const response = await api.get('/profile/company');
  return response.data;
};

export const createCompanyProfile = async (companyData) => {
  const response = await api.post('/profile/company', companyData);
  return response.data;
};

export const updateCompanyProfile = async (companyData) => {
  const response = await api.put('/profile/company', companyData);
  return response.data;
};
