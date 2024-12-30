const routes = [
  {
    path: "/",
    component: () => import("./pages/Home"),
    middleware: ["sessionCheck"], // No middleware for this route
  },
  {
    path: "/dashboard",
    component: () => import("./pages/Dashboard"),
    middleware: ["auth"], // Protected route with middleware
  },
  {
    path: "/login",
    component: () => import("./pages/Login"),
    middleware: ["sessionCheck"], // Public route
  },
];

export default routes;