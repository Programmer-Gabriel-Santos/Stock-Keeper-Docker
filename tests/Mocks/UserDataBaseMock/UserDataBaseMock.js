"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataBaseMock = void 0;
const userDataMock_1 = require("./userDataMock");
class UserDataBaseMock {
    static toUserDBModel = (user) => {
        return user;
    };
    findByEmail = async (email) => {
        const userDB = userDataMock_1.userDBMock;
        if (userDB.email !== email) {
            return undefined;
        }
        return userDB;
    };
    insertUser = async (user) => { };
}
exports.UserDataBaseMock = UserDataBaseMock;
//# sourceMappingURL=UserDataBaseMock.js.map