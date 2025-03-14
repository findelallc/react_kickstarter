import axios from "axios";
import { API_URL } from "./constants.service";

const baseURL = API_URL;

const instance = axios.create({ baseURL });
/**
 * Inject Authorization header with JWT token into axios instance.
 * This will be used for all the API calls.
 * @param {string} jwt - JWT token to be injected.
 */
function injectAuthToken(jwt) {
  instance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

/**
 * Remove Authorization header from axios instance.
 * This is useful when the user logs out.
 */
function removeAuthToken() {
  delete instance.defaults.headers.common.Authorization;
}

const httpService = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
  injectAuthToken,
  removeAuthToken,
};

export default httpService;
