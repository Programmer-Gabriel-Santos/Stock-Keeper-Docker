"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatorMock = void 0;
const User_1 = require("../../../src/models/User");
class AuthenticatorMock {
    generateToken = (payload) => {
        switch (payload.role) {
            case User_1.USER_ROLES.ADMIN:
                return "ADMIN";
            default:
                return "NORMAL";
        }
    };
    getTokenPayload = (token) => {
        switch (token) {
            case "ADMIN":
                const adminPayload = {
                    id: "1",
                    role: User_1.USER_ROLES.ADMIN
                };
                return adminPayload;
            case "NORMAL":
                const normalPayload = {
                    id: "2",
                    role: User_1.USER_ROLES.NORMAL
                };
                return normalPayload;
            default:
                return null;
        }
    };
}
exports.AuthenticatorMock = AuthenticatorMock;
//# sourceMappingURL=AuthenticatorMock.js.map