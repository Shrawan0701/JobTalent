import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, token, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // 🚫 Block onboarded users from onboarding pages
  if (
    user.isOnboarded &&
    location.pathname.startsWith('/onboarding')
  ) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // 🚫 Force onboarding if not onboarded
 // 🚫 Force onboarding ONLY from dashboard
if (
  !user.isOnboarded &&
  location.pathname.endsWith('/dashboard')
) {
  return <Navigate to={`/onboarding/${user.role}`} replace />;
}


  return children;
}