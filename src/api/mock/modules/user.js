import { createResponse } from "../response-util";
import Mock from "mockjs";

export default {
  "get|/api/user-management/users": createResponse(
    Mock.mock({
      "data|15-20": [
        {
          "id|+1": 1,
          username: "@string(8)",
          avatar: "avatar.jpg",
          "gender|1": [1, 2],
          email: "@string(10,18)@domain.com",
          "status|1": [1, 2],
          createTime: "@date @time",
          roleNames: "role1,role2",
          roleIds: "1,2"
        }
      ]
    })["data"]
  ),
  "post|/api/user-management/user": createResponse(),
  "put|/api/user-management/user/\\d+": createResponse(),
  "post|/api/user-management/avatar": createResponse(),
  "patch|/api/user-management/user/\\d+": createResponse(),
  "delete|/api/user-management/users": createResponse()
};
