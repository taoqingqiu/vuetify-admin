import { createResponse } from "../response-util";
import Mock from "mockjs";

export default {
  "get|/api/role-management/roles": createResponse(
    Mock.mock({
      "data|5-15": [
        {
          "id|+1": 1,
          name: "@string(8, 10)",
          description: "@string(5, 20)",
        },
      ],
    })["data"]
  ),
  "post|/api/role-management/role": createResponse(),
  "put|/api/role-management/role/\\d+": createResponse(),
  "delete|/api/role-management/roles": createResponse(),
  "get|/api/role-management/role/\\d+/permissions": createResponse([
    "/dashboard:visit",
    "/three/levels/demo:visit",
    "/system/user-management:visit",
    "/system/role-management:visit",
    "user:retrieve",
    "user:create",
    "user:update",
    "user:delete",
    "role:retrieve",
    "role:create",
    "role:update",
    "role:delete",
  ]),
  "patch|/api/role-management/role/\\d+/permissions": createResponse(),
};
