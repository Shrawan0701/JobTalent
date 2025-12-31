import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as profileService from '../services/profileService';
import { AuthContext } from '../context/AuthContext';

export default function EditTalentProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); // ✅ MUST BE HERE

  const [form, setForm] = useState({
    desired_role: '',
    city: '',
    experience: '',
    education: '',
    skills: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await profileService.getTalentProfile();
        const p = res.profile;

        setForm({
          desired_role: p.desired_role || '',
          city: p.city || '',
          experience: p.experience || '',
          education: p.education || '',
          skills: p.skills ? p.skills.join(', ') : ''
        });
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false); // ✅ ALWAYS EXECUTES
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await profileService.updateTalentProfile({
      ...form,
      skills: form.skills.split(',').map(s => s.trim())
    });

    // ✅ Ensure onboarding never triggers again
    const updatedUser = { ...user, isOnboarded: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    navigate('/talent/profile', { replace: true });
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="container-premium">
        <h2 className="profile-name">Edit Profile</h2>

        <form
          onSubmit={handleSubmit}
          className="profile-card profile-card-main"
          style={{ padding: 24 }}
        >
          <label className="field-label">Desired Role</label>
          <input
            name="desired_role"
            value={form.desired_role}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">Experience</label>
          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">Education</label>
          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            className="search-input"
          />

          <label className="field-label">Skills (comma separated)</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="search-input"
          />

          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <button type="submit" className="apply-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="nav-btn"
              onClick={() => navigate('/talent/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}