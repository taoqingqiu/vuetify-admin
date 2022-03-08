import axios from "../utils/axios";

/**
 * Get access-token
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const getToken = (username, password) =>
  axios.get("/auth/token", { params: { username, password } });

/**
 * Get permissions
 *
 * @returns
 */
export const getPermissions = () => axios.get("/auth/permissions");

/**
 * Get info of signed-in user
 *
 * @returns
 */
export const getUserInfo = () => axios.get("/auth/user-info");
