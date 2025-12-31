import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as profileService from '../services/profileService';
import "../assets/css/onboarding.css";

import {
  Briefcase,
  MapPin,
  Target,
  Upload,
} from 'lucide-react';


export default function TalentOnboarding() {
  const [form, setForm] = useState({
    city: '',
    desired_role: '',
    experience: '',
    skills: '',
    education: '',
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [resumeName, setResumeName] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setForm((p) => ({ ...p, resume: file }));
      setResumeName(file.name);
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }

    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.city) newErrors.city = 'City is required';
    if (!form.desired_role) newErrors.desired_role = 'Role is required';
    if (!form.experience) newErrors.experience = 'Experience is required';
    if (!form.skills) newErrors.skills = 'Skills are required';
    if (!form.education) newErrors.education = 'Education is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  if (!validateForm()) return;
  console.log({
  city: form.city,
  desired_role: form.desired_role,
  experience: form.experience,
  education: form.education,
  skills: form.skills,
  resume: form.resume,
});

  try {
    const res = await profileService.createTalentProfile({
      city: form.city,
      desired_role: form.desired_role,
      experience: form.experience,
      skills: form.skills.split(',').map(s => s.trim()),
      education: form.education,
      resume: form.resume,
    });

    // 🔥 CRITICAL: update AuthContext from backend response
    const updatedUser = {
  ...res.user,
  isOnboarded: true,
};


    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // 🔥 force redirect AFTER state update
    setTimeout(() => {
      navigate('/talent/dashboard', { replace: true });
    }, 0);

  } catch (err) {
    console.error('Onboarding failed', err);
    alert('Failed to complete onboarding');
  }
};

  const removeResume = () => {
    setForm((p) => ({ ...p, resume: null }));
    setResumeName('');
  };
 
  return (
  <div className="onboarding-page">
    <div className="onboarding-card">
      <h1 className="onboarding-title">Complete Your Profile</h1>
      <p className="onboarding-subtitle">
        Get matched with the right opportunities
      </p>

      <div className="onboarding-form">
        {/* CITY */}
        <div>
          <label className="onboarding-label">
            <MapPin size={14} /> City
          </label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="onboarding-input"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="onboarding-label">
            <Target size={14} /> Desired Role
          </label>
          <input
            name="desired_role"
            value={form.desired_role}
            onChange={handleChange}
            className="onboarding-input"
          />
        </div>

        {/* EXPERIENCE */}
        <div>
          <label className="onboarding-label">
            <Briefcase size={14} /> Experience
          </label>
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="onboarding-select"
          >
            <option value="">Select</option>
            <option>Fresher</option>
            <option>0–1 years</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>5+ years</option>
          </select>
        </div>

        {/* SKILLS */}
        <div>
          <label className="onboarding-label">Skills</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="onboarding-input"
            placeholder="React, Java, SQL"
          />
        </div>

        {/* EDUCATION */}
        <div>
          <label className="onboarding-label">Education</label>
          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            className="onboarding-input"
          />
        </div>

        {/* RESUME */}
        <label className="onboarding-file">
  <Upload size={22} />
  <span>{resumeName || "Upload Resume (PDF)"}</span>
  <input
    type="file"
    name="resume"
    accept=".pdf"
    onChange={handleChange}
    hidden
  />
</label>


        {/* SUBMIT */}
        <button
          className="onboarding-submit"
          onClick={handleSubmit}
        >
          Complete Profile & View Jobs
        </button>
      </div>
    </div>
  </div>
);

}