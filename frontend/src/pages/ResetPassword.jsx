import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService.js';
import '../assets/css/auth.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  // 🔒 Protect against refresh
  useEffect(() => {
    if (!email || !otp) {
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const submit = async () => {
    if (password.length < 8) {
      return setError('Password must be at least 8 characters');
    }

    if (password !== confirm) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      setError('');
      await authService.resetPassword(email, otp, password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <h1 className="auth-title">Create new password</h1>
          <p className="auth-subtitle">
            Choose a strong password for your account.
          </p>

          {error && <div className="auth-alert">{error}</div>}

          <input
            type="password"
            className="auth-input"
            placeholder="New password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Confirm password"
            onChange={(e) => setConfirm(e.target.value)}
            style={{ marginTop: 12 }}
          />

          <button
            className="auth-primary-btn"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
