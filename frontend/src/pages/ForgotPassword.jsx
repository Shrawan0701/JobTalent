import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService.js';
import '../assets/css/auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setError('');
      await authService.sendResetOtp(email);
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <h1 className="auth-title">Reset password</h1>
          <p className="auth-subtitle">
            Enter your email to receive a verification code.
          </p>

          {error && <div className="auth-alert">{error}</div>}

          <input
            type="email"
            className="auth-input"
            
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="auth-primary-btn"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Sending OTP…' : 'Send OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}
