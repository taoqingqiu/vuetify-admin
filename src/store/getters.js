import { flattenMenuTree } from "@/utils/tree-util";

export default {
  authMenus: (state) =>
    state.user.menus ? flattenMenuTree(state.user.menus) : [],
  dev: () => process.env.NODE_ENV === "development",
};
