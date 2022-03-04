import { createResponse } from "../response-util";

export default {
  "get|/api/auth/token": createResponse("auth-token"),
  "get|/api/auth/permissions": createResponse([
    "/dashboard:visit",
    "/tree/levels/demo:visit",
    "/tree/levels-another/demo:visit",
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
