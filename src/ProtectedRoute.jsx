import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element = null, ...rest }) => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // // If not authenticated, return null
  // if (!isAuthenticated) {
  //   return null;
  // }

  // Render the provided element (route) if authenticated
  return element;
};

export default ProtectedRoute;