import axios from "../utils/axios";

/**
 * 获取菜单列表
 * @returns
 */
export const getMenus = () => axios.get("/menu-management/menus");

/**
 * 获取菜单树
 * @returns
 */
export const getMenuTree = () => axios.get("/menu-management/menu-tree");

/**
 * 新建根菜单
 * @param {*} createData
 * @returns
 */
export const createMenu = (createData) =>
  axios.post("/menu-management/menu", createData);

/**
 * 编辑菜单
 * @param {*} id
 * @param {*} updateData
 * @returns
 */
export const updateMenu = (id, updateData) =>
  axios.put(`/menu-management/menu/${id}`, updateData);

/**
 * 删除菜单们
 * @param {*} ids
 * @returns
 */
export const deleteMenus = (ids) =>
  axios.delete(`/menu-management/menus`, { params: { ids } });
