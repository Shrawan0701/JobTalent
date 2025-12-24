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

  // 🔥 GOOGLE SIGNUP HANDLER
  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="text-center mb-4">Create Account</h1>

        {/* 🔥 GOOGLE SIGNUP BUTTON */}
        <button
          className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
          onClick={handleGoogleSignup}
        >
          <span style={{ fontSize: '18px' }}>🔵</span>
          Continue with Google
        </button>

        <div className="text-center text-muted mb-3">or</div>

        {/* ROLE SELECTOR */}
        <div className="role-selector mb-4">
          <label className={'role-option' + (formData.role === 'talent' ? ' active' : '')}>
            <input
              type="radio"
              name="role"
              value="talent"
              checked={formData.role === 'talent'}
              onChange={handleChange}
            />
            <span>
              <span className="emoji">🎯</span>
              I’m looking for a job
            </span>
          </label>

          <label className={'role-option' + (formData.role === 'employer' ? ' active' : '')}>
            <input
              type="radio"
              name="role"
              value="employer"
              checked={formData.role === 'employer'}
              onChange={handleChange}
            />
            <span>
              <span className="emoji">🏢</span>
              I’m hiring
            </span>
          </label>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* EMAIL SIGNUP FORM */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-muted">
          Already have an account?{' '}
          <a href="/login" className="text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
