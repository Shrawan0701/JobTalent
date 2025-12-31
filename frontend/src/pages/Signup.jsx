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
              <span>Recruiter</span>
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
                  
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label className="auth-label" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                name="email"
                className="auth-input"
               
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
