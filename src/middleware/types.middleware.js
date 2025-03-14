import {
  getStorage,
  clearStorage,
  getStorageByPromise,
} from "../services/storage.service";
// import { globalStore } from "../services/store/global.store";
import { decodeTokenManually } from "../services/utils.service";
import httpService from "../services/http-service";

export const middlewares = {
  auth: ({ navigate }) => {
    const isAuthenticated = Boolean(getStorage("authToken"));
    const decodedToken = decodeTokenManually(getStorage("authToken"));
    if (!isAuthenticated) {
      httpService.removeAuthToken();
      clearStorage("authToken");
      navigate("/");
    } else if (isAuthenticated && decodedToken?.EXP < Date.now()) {
      httpService.injectAuthToken(getStorage("authToken")); // inject token to axios instance
    }
  },
  sessionCheck: ({ navigate }) => {
    const isAuthenticated = Boolean(getStorage("authToken"));
    if (isAuthenticated) {
      if (decodeTokenManually(getStorage("authToken"))?.EXP < Date.now()) {
        getStorageByPromise("currentCourse").then((response) => {
          if (response.data) {
            navigate("/dashboard");
          }
        });
      }
    }
  },
};
