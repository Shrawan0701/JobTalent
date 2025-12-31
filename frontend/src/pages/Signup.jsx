import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../assets/css/auth.css';
import registerImg from '../assets/images/register.jpg';

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: searchParams.get('role') || 'talent',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!['talent', 'employer'].includes(formData.role)) {
      setError('Invalid role selected');
      return;
    }

    setLoading(true);

    try {
      await signup(
        formData.email,
        formData.password,
        formData.role,
        formData.firstName,
        formData.lastName
      );

      // 🔥 KEEP YOUR EXISTING FLOW
      if (formData.role === 'talent') {
        navigate('/talent/dashboard');
      } else {
        navigate('/employer/onboarding');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Unable to create your account'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-brand">
            <div className="auth-logo-badge">C</div>
            <span>CURSON</span>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join Curson to discover curated jobs and exceptional talent.
          </p>

          {error && <div className="auth-alert">{error}</div>}

          {/* ✅ ADDED: GOOGLE SIGNUP BUTTON (LOGIC ALREADY EXISTED) */}
          <button
            type="button"
            className="auth-oauth-btn"
            onClick={handleGoogleSignup}
          >
            Sign up with Google
          </button>

          <div className="auth-separator">
            <div className="auth-separator-line" />
            <span>or continue with email</span>
            <div className="auth-separator-line" />
          </div>

          {/* 🔒 ROLE SELECTOR — UNCHANGED */}
          <div className="role-selector">
            <button
              type="button"
              className={
                'role-pill' +
                (formData.role === 'talent' ? ' role-pill-active' : '')
              }
              onClick={() =>
                setFormData((p) => ({ ...p, role: 'talent' }))
              }
            >
              <span>Candidate</span>
            </button>

            <button
              type="button"
              className={
                'role-pill' +
                (formData.role === 'employer' ? ' role-pill-active' : '')
              }
              onClick={() =>
                setFormData((p) => ({ ...p, role: 'employer' }))
              }
            >
              <span>Recruiter</span>
            </button>
          </div>

          {/* 🔒 FORM — UNCHANGED */}
          <form onSubmit={handleSubmit} autoComplete="on">
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label className="auth-label">First name</label>
                <input
                  name="firstName"
                  className="auth-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="auth-label">Last name</label>
                <input
                  name="lastName"
                  className="auth-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <input
              name="email"
              type="email"
              className="auth-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              className="auth-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              name="confirmPassword"
              type="password"
              className="auth-input"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <div className="auth-footer">
            Already using Curson?{' '}
            <a href="/login" className="auth-link">
              Sign in
            </a>
          </div>
        </div>
      </div>

      {/* 🔒 RIGHT IMAGE — UNCHANGED */}
      <div className="auth-right">
        <div className="auth-visual">
          <img
            src={registerImg}
            alt="Professional working on laptop"
            className="auth-visual-img"
          />
          <div className="auth-visual-overlay">
            <h2>Build your career with Curson</h2>
            <p>Where ambitious talent meets trusted recruiters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
