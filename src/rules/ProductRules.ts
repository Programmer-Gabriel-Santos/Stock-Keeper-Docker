import { ProductDataBase } from "../dataBase/ProductDataBase"
import { InsertOutputDTO, IProduct, IProductInputDTO, Product } from "../models/Products"
import {ParamsError} from "../errors/ParamsError"
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

    createProduct = async (input: IProductInputDTO) => {
        const { name, price, description, idUser , token} = input

        if (!name || !price || !idUser || !token) {
            throw new ParamsError()
        }

        if(typeof  name !== "string" ||  typeof price !== "number" || typeof idUser !== "string" || typeof token !== "string"){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        if(payload.role !== "ADMIN"){
            throw new AuthorizationError()
        }

        const productDB = await this.productDatabase.findByName(name)

        if (productDB) {
            throw new ConflictError()
        }

        const id = this.idGenerator.generate()

        const product = new Product(
            id,
            name,
            price,
            description,
            idUser
        )

        await this.productDatabase.insertProduct(product)
        
        const response: InsertOutputDTO = {
            message: "Produto cadastrado com sucesso!"
        }

        return response
    }
}