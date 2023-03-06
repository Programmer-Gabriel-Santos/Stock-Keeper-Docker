import { Router } from "express"
import { ProductRules } from "../rules/ProductRules"
import { ProductDataBase } from "../dataBase/ProductDataBase"
import { ProductController } from "../controller/ProductController"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { ProductDataBaseMock } from "../../tests/Mocks/ProductDataBaseMock/ProductDataBaseMock"
import { IdGeneratorMock } from "../../tests/Mocks/servicesMock/idGeneratorMock"
import { AuthenticatorMock } from "../../tests/Mocks/servicesMock/AuthenticatorMock"

export const productRouter = Router()

const productController = new ProductController(
    new ProductRules(
        new ProductDataBase(),
        new IdGenerator(),
        new Authenticator(),
    )
)

productRouter.post("/add", productController.createProduct)