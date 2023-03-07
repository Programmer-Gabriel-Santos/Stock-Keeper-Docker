"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashManagerMock = void 0;
class HashManagerMock {
    hash = async (plaintext) => {
        if (plaintext == "123456") {
            return "admin-hash";
        }
        return "normal-hash";
    };
    compare = async (plaintext, hash) => {
        if (plaintext == "123456" && hash == "123456") {
            return true;
        }
        return false;
    };
}
exports.HashManagerMock = HashManagerMock;
//# sourceMappingURL=HashManagerMock.js.map