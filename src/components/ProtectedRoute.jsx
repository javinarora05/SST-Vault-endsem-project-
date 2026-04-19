
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import LoadingSkeleton from './LoadingSkeleton';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuthStore();
  const location = useLocation();

  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LoadingSkeleton variant="cards" count={3} />
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default ProtectedRoute;
