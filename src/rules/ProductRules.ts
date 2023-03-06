import { ProductDataBase } from "../dataBase/ProductDataBase"
import { IOutputDTO, IProductInputDTO, ITag, ITagDB, Product } from "../models/Products"
import { ParamsError } from "../errors/ParamsError"
import { ConflictError } from "../errors/ConflictError"
import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { AuthorizationError } from "../errors/AuthorizationError"
import { AuthenticationError } from "../errors/AuthenticationError"
import { ProductDataBaseMock } from "../../tests/Mocks/ProductDataBaseMock/ProductDataBaseMock"
import { AuthenticatorMock } from "../../tests/Mocks/servicesMock/AuthenticatorMock"
import { IdGeneratorMock } from "../../tests/Mocks/servicesMock/idGeneratorMock"

export class ProductRules {
    constructor(
        private productDataBase: ProductDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
        //          ---------------------
        //    // Mocks:
        // private productDataBase: ProductDataBaseMock,
        // private idGenerator: IdGeneratorMock,
        // private authenticator: AuthenticatorMock,

    ) { }

    //      // para o teste funcionar comente o método createProduct e descomente o método createProductTest,
    //      // para que o teste de erros funcionem corretamente

    // createProductTest = async(input: any) =>{

    createProduct = async (input: IProductInputDTO) => {
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

        const productDB = await this.productDataBase.findByName(name)

        if (productDB) {
            throw new ConflictError()
        }

        const idProduct = this.idGenerator.generate()

        if (!Array.isArray(tags) && !Array.isArray(tags.tag) && typeof tags.tag !== "string") {
            throw new ParamsError()

        } if (!Array.isArray(tags) && typeof tags.tag !== "string") {
            tags = tags.tag.map((tag: string) => ({ tag: tag, idProduct }))

        } if (Array.isArray(tags)) {
            tags = tags.map((tag: any) => ({ tag: tag.tag, idProduct }))

        } if (typeof tags.tag === "string") {
            tags = { tag: tags.tag, idProduct }
        }

        const newProduct = new Product(
            idProduct,
            name,
            price,
            description,
            idUser
        )

        const productDBModel = ProductDataBase.toProductDBModel(newProduct)

        await this.productDataBase.insertProduct(productDBModel)

        if (Array.isArray(tags)) {
            tags = tags.map((tag: ITag)=> ProductDataBase.toTagDBModel(tag))

            await this.productDataBase.insertTag(tags)
        }
        
        if(tags.tag == "string"){  
            tags = ProductDataBase.toTagDBModel(tags)

            await this.productDataBase.insertTag(tags)
        }

        const response: IOutputDTO = {
            message: "Produto cadastrado com sucesso!"
        }

        return response
    }
}