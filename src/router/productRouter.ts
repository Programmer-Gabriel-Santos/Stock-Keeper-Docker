import { Router } from "express"
import { ProductRules } from "../rules/ProductRules"
import { ProductDataBase } from "../dataBase/ProductDataBase"
import { ProductController } from "../controller/ProductController"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export const productRouter = Router()

const productController = new ProductController(
    new ProductRules(
        new ProductDataBase(),
        new IdGenerator(),
        new Authenticator(),
    )
)

productRouter.post("/add", productController.create)