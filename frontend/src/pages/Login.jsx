import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import '../assets/css/auth.css';
import { getEmployerProfile } from '../services/employerService';


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
    return;
  }

  if (user.role === 'employer') {
  const res = await getEmployerProfile();

  if (res.data) {
    navigate('/employer/dashboard');   // company exists
  } else {
    navigate('/employer/onboarding');  // first time only
  }


    return;
  }

  navigate('/');
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

         

        

          <form onSubmit={handleSubmit} autoComplete="on">
            <div style={{ marginBottom: 14 }}>
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="auth-input"
                
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
                  Forgot Password?
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
