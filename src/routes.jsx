import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export const routes = [
  {
    path: "/",
    element: <Home />,
    middleware: [], // Public route, no middleware
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    middleware: ["auth"], // Auth middleware for protected route
  },
  {
    path: "/login",
    element: <Login />,
    middleware: ["sessionCheck"],  // Middleware for session validation
  },
];