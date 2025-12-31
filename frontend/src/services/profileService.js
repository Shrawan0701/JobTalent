import api from './api.js';

/* ===================== TALENT ===================== */

// 🔹 GET talent profile
export const getTalentProfile = async () => {
  const response = await api.get('/profile/talent');
  return response.data;
};

// 🔹 UPDATE talent profile (JSON only)
export const updateTalentProfile = async (profileData) => {
  const response = await api.put('/profile/talent', profileData);
  return response.data;
};

// 🔹 CREATE talent profile (ONBOARDING + RESUME UPLOAD)
export const createTalentProfile = async (data) => {
  const formData = new FormData();

  // REQUIRED onboarding fields
  formData.append('city', data.city);
  formData.append('desired_role', data.desired_role);
  formData.append('experience', data.experience);
  formData.append('education', data.education);

  // Optional array
  if (Array.isArray(data.skills)) {
    data.skills.forEach((skill) => {
      formData.append('skills', skill);
    });
  }

  // Optional resume
  if (data.resume) {
    formData.append('resume', data.resume);
  }

  const response = await api.post('/profile/talent', formData);
  return response.data;
};

// 🔹 UPLOAD profile photo (Talent)
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await api.post('/profile/photo', formData);
  return response.data;
};

// 🔹 UPLOAD resume only (Talent)
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/profile/resume', formData);
  return response.data;
};

/* ===================== COMPANY / EMPLOYER ===================== */

// 🔹 GET company profile
export const getCompanyProfile = async () => {
  const response = await api.get('/profile/company');
  return response.data;
};

// 🔹 CREATE company profile (Employer onboarding)
export const createCompanyProfile = async (companyData) => {
  const response = await api.post('/profile/company', companyData);
  return response.data;
};

// 🔹 UPDATE company profile
export const updateCompanyProfile = async (companyData) => {
  const response = await api.put('/profile/company', companyData);
  return response.data;
};
