import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  console.log(children);
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
};
export default ProtectedRoute;
