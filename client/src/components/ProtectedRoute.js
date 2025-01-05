import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (userType === 'admin' && window.location.pathname === '/') {
    return <Navigate to="/admin" />;
  }

  if (userType === 'seller' && window.location.pathname === '/') {
    return <Navigate to="/seller" />;
  }

  return children;
};

export default ProtectedRoute;