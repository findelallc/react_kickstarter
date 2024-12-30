import axios from "axios";
import { API_URL } from "../constants.service";

/**
 * Logs in a user using the provided credentials.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The response from the API.
 */
export const loginUser = async (email, password) => {
    const response = await axios.post(API_URL + "/user/login?_format=json", {
        email,
        password,
    });
    return response;
};