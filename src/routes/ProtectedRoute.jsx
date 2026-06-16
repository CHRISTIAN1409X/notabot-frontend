import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifySession } from "../services/api";
import { useQuery } from '@tanstack/react-query';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

   // Validar sesión con TanStack Query (cookies)
  const { data: authObj, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: verifySession,
    retry: false,
    staleTime: 600000, // 10 min
  });

  console.log(authObj);
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading session...</p> 
      </div>
    );
  }

   if (isError || !authObj) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
}
