import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const MiddlewareWrapper = ({ children, middleware = [] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    middleware.forEach((middlewareFn) => {
      if (typeof middlewareFn === "function") {
        middlewareFn({ navigate });
      }
    });
  }, [middleware, navigate]);

  return <>{children}</>; // Render the wrapped component
};

MiddlewareWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Validates that 'children' is passed
  middleware: PropTypes.arrayOf(PropTypes.func), // Validates 'middleware' as an array of functions
};

export default MiddlewareWrapper;