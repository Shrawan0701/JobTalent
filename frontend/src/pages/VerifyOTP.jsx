import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService.js';
import '../assets/css/auth.css';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // 🔒 If user refreshes page, redirect back
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const submit = async () => {
    if (!otp) return;

    try {
      setLoading(true);
      setError('');
      await authService.verifyResetOtp(email, otp);
      navigate('/reset-password', { state: { email, otp } });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <h1 className="auth-title">Enter verification code</h1>
          <p className="auth-subtitle">
            We’ve sent a 6-digit code to <b>{email}</b>
          </p>

          {error && <div className="auth-alert">{error}</div>}

          <input
            className="auth-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            className="auth-primary-btn"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Verifying…' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
}
