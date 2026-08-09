import { Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Only allows access if the user is logged in via Firebase Auth.
// Redirects to /admin/login otherwise.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0f1e', color: '#fff' }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
