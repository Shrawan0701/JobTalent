import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { setUserFromToken } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      setUserFromToken(token);
      navigate('/login-redirect');
    }
  }, []);

  return null;
}
