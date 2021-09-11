import axios, { formDataAxios } from "../utils/axios";

/**
 * 获取用户列表
 * @returns
 */
export const getUsers = () => axios.get("/user-management/users");

/**
 * 上传头像
 * @param {*} avatar
 * @returns
 */
export const uploadAvatar = (avatar) =>
  formDataAxios.post(
    "/user-management/avatar",
    (() => {
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", avatar);
      return avatarFormData;
    })()
  );

/**
 * 新增用户
 * @param {*} createData
 * @returns
 */
export const createUser = (createData) =>
  axios.post("/user-management/user", createData);

/**
 * 编辑用户
 * @param {*} updateData
 * @returns
 */
export const updateUser = (id, updateData) =>
  axios.put(`/user-management/user/${id}`, updateData);

/**
 * 激活用户
 * @param {*} id
 * @returns
 */
export const activateUser = (id) =>
  axios.patch(`/user-management/user/${id}`, { status: 1 });

/**
 * 冻结用户
 * @param {*} id
 * @returns
 */
export const freezeUser = (id) =>
  axios.patch(`/user-management/user/${id}`, { status: 2 });

/**
 * 删除用户们
 * @param {*} id
 * @returns
 */
export const deleteUsers = (ids) =>
  axios.delete("/user-management/users", { params: { ids } });

/**
 * 重置密码
 * @param {*} id
 * @param {*} password
 * @returns
 */
export const resetPassword = (id, password) =>
  axios.patch(`/user-management/user/${id}`, { password });
