import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

import TalentDashboard from './pages/TalentDashboard.jsx';
import TalentProfile from './pages/TalentProfile.jsx';
import EditTalentProfile from './pages/EditTalentProfile.jsx';

import EmployerDashboard from './pages/EmployerDashboard.jsx';
import EmployerProfile from './pages/employer/EmployerProfile.jsx';

import TalentOnboarding from './onboarding/TalentOnboarding.jsx';
import EmployerOnboarding from './pages/employer/EmployerOnboarding.jsx';

import OAuthSuccess from './pages/OAuthSuccess.jsx';
import LoginRedirect from './pages/LoginRedirect.jsx';

import ForgotPassword from './pages/ForgotPassword.jsx';
import VerifyOTP from './pages/VerifyOTP.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

import ProtectedRoute from './routes/ProtectedRoute.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ================= OAUTH ================= */}
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/login-redirect" element={<LoginRedirect />} />

      {/* ================= TALENT ONBOARDING ================= */}
      <Route
        path="/onboarding/talent"
        element={
          <ProtectedRoute role="talent">
            <TalentOnboarding />
          </ProtectedRoute>
        }
      />

      {/* ================= EMPLOYER ONBOARDING ================= */}
      <Route
        path="/employer/onboarding"
        element={
          <ProtectedRoute role="employer">
            <EmployerOnboarding />
          </ProtectedRoute>
        }
      />

      {/* ================= TALENT ================= */}
      <Route
        path="/talent/dashboard"
        element={
          <ProtectedRoute role="talent">
            <TalentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/talent/profile"
        element={
          <ProtectedRoute role="talent">
            <TalentProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute role="talent">
            <EditTalentProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= EMPLOYER ================= */}
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/profile"
        element={
          <ProtectedRoute role="employer">
            <EmployerProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
