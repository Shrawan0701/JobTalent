import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../assets/css/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);

      if (user.role === 'talent') {
        navigate('/talent/dashboard');
      } else if (user.role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in right now');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-brand">
            <div className="auth-logo-badge">C</div>
            <span>CURSON</span>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to access your Curson workspace.
          </p>

          {error && <div className="auth-alert">{error}</div>}

          <button
            type="button"
            className="auth-oauth-btn"
            onClick={googleLogin}
          >
            <span className="auth-oauth-btn-icon">
              {/* Google G icon (branding‑safe) */}
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
            <span>Continue with Google</span>
          </button>

          <div className="auth-separator">
            <div className="auth-separator-line" />
            <span>or continue with email</span>
            <div className="auth-separator-line" />
          </div>

          <form onSubmit={handleSubmit} autoComplete="on">
            <div style={{ marginBottom: 14 }}>
              <label className="auth-label" htmlFor="email">
                Work email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="auth-input"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 6 }}>
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  className="auth-link"
                  style={{ fontSize: '0.78rem' }}
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                className="auth-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-primary-btn"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="auth-footer">
            New to Curson?{' '}
            <a href="/signup" className="auth-link">
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
