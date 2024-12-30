/**
 * Stores the authentication token in localStorage.
 * @param {string} token - The token to be stored.
 */
export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  /**
   * Retrieves the authentication token from localStorage.
   * @returns {string|null} The stored token, or null if none exists.
   */
  export const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };
  
  /**
   * Removes the authentication token from localStorage (logout).
   */
  export const clearAuthToken = () => {
    localStorage.removeItem("authToken");
  };