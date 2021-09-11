import axios from "../utils/axios";

/**
 * 获取角色列表
 *
 * @returns
 */
export const getRoles = () => axios.get("/role-management/roles");

/**
 * 获取某角色已授权的菜单
 * @param {*} id
 * @returns
 */
export const getAuthorizedMenus = (id) =>
  axios.get(`/role-management/${id}/authorized-menus`);

/**
 * 更新某角色的已授权菜单
 * @param {*} id
 * @param {*} menuIds
 * @returns
 */
export const updateRoleAuthorities = (id, menuIds) =>
  axios.put(`/role-management/role/${id}/authorized-menus`, { menuIds });

/**
 * 新增角色
 * @param {*} createData
 * @returns
 */
export const createRole = (createData) =>
  axios.post("/role-management/role", createData);

/**
 * 编辑角色
 * @param {*} createData
 * @returns
 */
export const updateRole = (id, updateData) =>
  axios.put(`/role-management/role/${id}`, updateData);

/**
 * 删除角色们
 * @param {*} ids
 * @returns
 */
export const deleteRoles = (ids) =>
  axios.delete("/role-management/roles", { params: { ids } });
