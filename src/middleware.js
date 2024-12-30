export const middlewares = {
  auth: ({ navigate }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    if (!isAuthenticated) {
      navigate("/login");
    }
  },
  sessionCheck: ({ navigate }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  },
};