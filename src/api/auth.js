import axios from '../utils/axios';

/**
 * 获取 token 实则为登录
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const getToken = (username, password) => axios.get('/auth/token', { params: { username, password } });

/**
 * 获取当前用户的权限（菜单、操作树）
 *
 * @returns
 */
export const getAuthorities = () => axios.get('/auth/authorities');
