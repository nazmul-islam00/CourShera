import { Navigate } from "react-router-dom";
import { useAuth } from "./../../context/auth/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
