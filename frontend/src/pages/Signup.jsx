import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../assets/css/auth.css';

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

      if (formData.role === 'talent') {
        navigate('/talent/dashboard');
      } else {
        navigate('/employer/dashboard');
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

          <button
            type="button"
            className="auth-oauth-btn"
            onClick={handleGoogleSignup}
          >
            <span className="auth-oauth-btn-icon">
              {/* same Google G icon */}
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#EA4335"
                  d="M11.99 10.2v3.6h5.02c-.2 1.14-.81 2.1-1.73 2.75l2.8 2.17C19.4 17.46 20.2 15.48 20.2 13c0-.7-.06-1.22-.17-1.76H11.99z"
                />
                <path
                  fill="#34A853"
                  d="M6.53 14.32A5.79 5.79 0 0 1 6.2 13c0-.46.08-.9.22-1.32L3.5 9.46A9.01 9.01 0 0 0 2.8 13c0 1.42.34 2.76.93 3.94l2.8-2.62z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.99 6.18c1.07 0 2.03.37 2.79 1.09l2.08-2.08A7.45 7.45 0 0 0 11.99 4a8.99 8.99 0 0 0-8.49 5.46l2.8 2.22c.4-1.21 1.25-2.24 2.45-2.78a4.98 4.98 0 0 1 3.24-.72z"
                />
                <path
                  fill="#4285F4"
                  d="M11.99 22a8.9 8.9 0 0 0 6.09-2.16l-2.8-2.17c-.76.53-1.73.83-3.29.83-2.48 0-4.6-1.65-5.37-3.94l-2.8 2.62A8.98 8.98 0 0 0 11.99 22z"
                />
              </svg>
            </span>
            <span>Sign up with Google</span>
          </button>

          <div className="auth-separator">
            <div className="auth-separator-line" />
            <span>or continue with email</span>
            <div className="auth-separator-line" />
          </div>

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
              <span className="emoji"></span>
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
              <span className="emoji"></span>
              <span>Hiring team</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} autoComplete="on">
            <div
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <label className="auth-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="auth-input"
                  placeholder="Alex"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="auth-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="auth-input"
                  placeholder="Patel"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label className="auth-label" htmlFor="signup-email">
                Work email
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                className="auth-input"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label className="auth-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                name="password"
                className="auth-input"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 4 }}>
              <label className="auth-label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="auth-input"
                placeholder="Re‑enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

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
    </div>
  );
}
