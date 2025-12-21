import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center mt-20">Checking access...</p>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
