/**
 * 将树拍平，便于鉴权以及初始跳转。默认菜单树列表是【纯粹的菜单树】
 *
 * @param {*} menuTree
 * @returns
 */
export const flattenMenuTree = (menuTree, returnKey = "path") => {
  const resultArr = [];
  menuTree.forEach((menu) => {
    if (!menu.children) {
      resultArr.push(menu[returnKey]);
    } else {
      resultArr.push(...flattenMenuTree(menu.children, returnKey));
    }
  });
  return resultArr;
};

/**
 * 查找传入 id 树节点的 children
 *
 * make sure:
 *  * 所传树节点，必有children
 *  * 树基础结构：{id: '', name: ''}
 *
 * @param {*} treeArr 是一个树组成的数组
 * @param {*} id
 */
export const getChildren = (treeArr, id) => {
  let result = null;
  treeArr.forEach((t) => {
    if (t.id === id) {
      result = JSON.parse(JSON.stringify(t.children));
    } else if (t.children && !result) {
      result = getChildren(t.children, id);
    }
  });

  return result;
};

/**
 * 根据 title 获取树节点
 *
 * make sure:
 *  * 树基础结构：{id: '', name: ''}
 *
 * @param {*} treeArr
 * @param {*} name
 * @returns
 */
export const getNodeByName = (treeArr, name) => {
  let result = null;
  treeArr.forEach((t) => {
    if (t.name === name) {
      result = JSON.parse(JSON.stringify(t));
    } else if (t.children && !result) {
      result = getNodeByName(t.children, name);
    }
  });
};

/**
 * 根据 id 获取 prent node
 *
 * make sure:
 *  * 所传树节点，必有 children
 *  * 树基础结构：{id: '', name: ''}
 *
 * @param {*} treeArr
 * @param {*} id
 * @param {*} parent
 * @returns
 */
export const getParentNode = (treeArr, id, parent = null) => {
  let parentNode = parent;
  if (!treeArr.some((t) => t.id === id)) {
    treeArr.forEach((t) => {
      if (t.children) {
        parentNode = getParentNode(t.children, id, t);
      }
    });
  }
  return parentNode;
};
