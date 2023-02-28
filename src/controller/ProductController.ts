import { Request, Response } from "express";
import { ProductDataBase } from "../dataBase/ProductDataBase";
import { IProduct, IProductInputDTO } from "../models/Products";
import { ProductRules } from "../rules/ProductRules";

export class ProductController {
    constructor(
        private productRules: ProductRules,
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const input: IProductInputDTO = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description || null,
                idUser: req.body.id_user,
                tags: req.body.tags,
                token: req.headers.authorization || null
            }

            const response = await this.productRules.createProduct(input)
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Um erro inesperado ocorreu :/" })
            }
        }

    }

}