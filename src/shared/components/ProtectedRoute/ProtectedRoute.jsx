import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../features/auth/context/AuthProvider";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated)
      navigate("/login", {
        state: {
          from: location.pathname,
        },
        replace: true,
      });
  }, [isAuthenticated, navigate, location]);
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
