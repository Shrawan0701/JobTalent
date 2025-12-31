import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import Landing from './pages/Landing.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import TalentDashboard from './pages/TalentDashboard.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import TalentProfile from './pages/TalentProfile.jsx';

// 🔥 MISSING IMPORTS (THIS WAS THE BUG)
import OAuthSuccess from './pages/OAuthSuccess.jsx';
import LoginRedirect from './pages/LoginRedirect.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Google OAuth */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/login-redirect" element={<LoginRedirect />} />

          {/* Talent */}
          <Route path="/talent/dashboard" element={<TalentDashboard />} />
          <Route path="/talent/profile" element={<TalentProfile />} />

          {/* Employer */}
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
