export const getAuthToken = () =>
  sessionStorage.getItem("auth-token") || localStorage.getItem("auth-token");

export const checkRememberMe = () => !!localStorage.getItem("auth-token");

export const removeAuthToken = () => {
  sessionStorage.removeItem("auth-token");
  localStorage.removeItem("auth-token");
};

export const getStorageItem = (key) =>
  sessionStorage.getItem(key) || localStorage.getItem(key);

export const removeStorageItem = (key) => {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};

export const resetAuthorities = () => {
  removeAuthToken();
  removeStorageItem("signed-in-user");
  removeStorageItem("menus-authorities");
};
