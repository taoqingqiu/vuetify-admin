import { createResponse } from "../response-util";

export default {
  "get|/api/role-management/roles": createResponse([
    {
      id: 1,
      name: "角色1",
      symbol: "role1",
      description: "this is role-1",
    },
    {
      id: 2,
      name: "角色2",
      symbol: "role2",
      description: "this is role-2",
    },
    {
      id: 3,
      name: "角色3",
      symbol: "role3",
      description: "this is role-3",
    },
    {
      id: 4,
      name: "角色4",
      symbol: "role4",
      description: "",
    },
  ]),
  "get|/api/role-management/\\d+/authorized-menus": createResponse([1, 2, 5]),
  "put|/api/role-management/role/\\d+/authorized-menus": createResponse(),
  "post|/api/role-management/role": createResponse(),
  "put|/api/role-management/role/\\d+": createResponse(),
  "delete|/api/role-management/roles": createResponse(),
};
