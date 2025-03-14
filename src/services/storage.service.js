/**
 * Stores the authentication token in localStorage.
 * @param {string} token - The token to be stored.
 */
export const setStorage = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * Retrieves the authentication token from localStorage.
 * @returns {string|null} The stored token, or null if none exists.
 */
export const getStorage = (key) => {
  return localStorage.getItem(key)
};

/**
 * get promise storage by 'key'
 * @param {*} key 
 * @returns 
 */
export const getStorageByPromise = (key) => {
  return new Promise((resolve) => {
    let response = { flag: false, data: null };
    if (getStorage(key)) {
      resolve({ ...response, flag: true, data: key === 'authToken' ? getStorage(key) : JSON.parse(getStorage(key)) });
    } else {
      resolve(response);
    }
  });
}

/**
 * Removes the authentication token from localStorage (logout).
 */
export const clearStorage = (key) => {
  if (key)
    localStorage.removeItem(key);
  else
    localStorage.clear();
};

/**
 * get Bearer Token
 * @param {*} token 
 */
export const getBearerToken = () => {
  return { headers: { Authorization: `Bearer ${getStorage('authToken')}` } };
};