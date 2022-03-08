import { createResponse } from "../response-util";

export default {
  "get|/api/auth/token": createResponse("access-token"),
  "get|/api/auth/user-info": createResponse("Admin"),
  "get|/api/auth/permissions": createResponse([
    "/dashboard:visit",
    "/three/levels/demo:visit",
    "/three/levels-another/demo:visit",
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
};
