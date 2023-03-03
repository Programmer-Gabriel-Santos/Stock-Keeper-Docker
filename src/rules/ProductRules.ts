import { ProductDataBase } from "../dataBase/ProductDataBase"
import { IOutputDTO, IProductInputDTO, ITagDB, Product } from "../models/Products"
import { ParamsError } from "../errors/ParamsError"
import { ConflictError } from "../errors/ConflictError"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { AuthorizationError } from "../errors/AuthorizationError"
import { AuthenticationError } from "../errors/AuthenticationError"

export class ProductRules {
    constructor(
        private productDatabase: ProductDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    createProduct = async (input: IProductInputDTO | any) => {

        let { name, price, description, idUser, tags, token } = input

        if (!name || !price || !idUser || !tags || !token) {
            throw new ParamsError()
        }

        if (
            typeof name !== "string" || typeof Number(price) !== "number" ||
            typeof idUser !== "string" ||
            typeof token !== "string"
        ) {
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        if (payload.role !== "ADMIN") {
            throw new AuthorizationError()
        }

        const productDB = await this.productDatabase.findByName(name)

        if (productDB) {
            throw new ConflictError()
        }

        const idProduct = this.idGenerator.generate()

        if (!Array.isArray(tags) && tags.tag.length < 2) {
            throw new ParamsError()

        } if (!Array.isArray(tags)) {
            tags = tags.tag.map((tag: string) => ({ tag: tag, idProduct }))
            
        } else {
            tags = tags.map((tag: any) => ({ tag: tag.tag, idProduct }))
        }

        const newProduct = new Product(
            idProduct,
            name,
            price,
            description,
            idUser
        )

        const productDBModel = ProductDataBase.toProductDBModel(newProduct)

        await this.productDatabase.insertProduct(productDBModel)

        const tagsDBModel: ITagDB[] = tags.map((tag: string) => {
            return ProductDataBase.toTagDBModel(tag)
        })

        tagsDBModel.forEach(async (tagDB: ITagDB) => {
            await this.productDatabase.insertTag(tagDB)
        })

        const response: IOutputDTO = {
            message: "Produto cadastrado com sucesso!"
        }

        return response
    }
}