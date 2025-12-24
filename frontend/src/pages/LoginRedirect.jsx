import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function LoginRedirect() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === 'employer') {
      navigate('/employer/dashboard');
    } else {
      navigate('/talent/dashboard');
    }
  }, [user]);

  return null;
}
