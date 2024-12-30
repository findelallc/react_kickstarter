export const middleware = {
  auth: ({ navigate }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }
};