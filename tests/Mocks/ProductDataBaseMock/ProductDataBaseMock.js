"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataBaseMock = void 0;
const productsMock_1 = require("./productsMock");
class ProductDataBaseMock {
    static toProductDBModel = (product) => {
        return product;
    };
    static toTagDBModel = (tag) => {
        return tag;
    };
    insertProduct = (product) => { };
    insertTag = (tag) => { };
    findByName = (name) => {
        if (name == productsMock_1.productDBMock.name) {
            return productsMock_1.productDBMock;
        }
        return null;
    };
}
exports.ProductDataBaseMock = ProductDataBaseMock;
//# sourceMappingURL=ProductDataBaseMock.js.map