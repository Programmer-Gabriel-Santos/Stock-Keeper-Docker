"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDBError = exports.userDBMock = void 0;
const User_1 = require("../../../src/models/User");
exports.userDBMock = {
    id_user: "1",
    name: "user mock",
    email: "mock@gmail.com",
    password: "123456",
    role: User_1.USER_ROLES.ADMIN
};
exports.userDBError = {
    id_user: "2",
    name: "user false",
    email: "user@gmail.com",
    password: "1234567",
    role: User_1.USER_ROLES.NORMAL
};
//# sourceMappingURL=userDataMock.js.map