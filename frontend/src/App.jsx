import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Landing from './pages/Landing.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import TalentDashboard from './pages/TalentDashboard.jsx';
import EmployerDashboard from './pages/EmployerDashboard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import TalentProfile from './pages/TalentProfile.jsx';

// inside <Routes>


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/talent/dashboard" element={<TalentDashboard />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/talent/profile" element={<TalentProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
