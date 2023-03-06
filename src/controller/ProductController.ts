import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { IProductInputDTO } from "../models/Products";
import { ProductRules } from "../rules/ProductRules";

export class ProductController {
    constructor(
        private productRules: ProductRules,
    ) { }

    createProduct = async (req: Request, res: Response) => {
        try {
            const input: IProductInputDTO | any = {
                idUser: req.body.product.idUser || req.body.product.iduser,
                name: req.body.product.name,
                price: req.body.product.price,
                description: req.body.product.description || null,
                tags: req.body.product.tags || req.body.product.tags.tag,
                token: req.headers.authorization as string
            }
            const response = await this.productRules.createProduct(input)

            res.send({message: response})
            
        } catch (error: unknown) {
            if (error instanceof BaseError) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Um erro inesperado ocorreu :/" })
            }
        }

    }

}