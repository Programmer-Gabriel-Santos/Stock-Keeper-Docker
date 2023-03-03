import { Request, Response } from "express";
import { IProductInputDTO } from "../models/Products";
import { ProductRules } from "../rules/ProductRules";

export class ProductController {
    constructor(
        private productRules: ProductRules,
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const input: IProductInputDTO = {
                name: req.body.product.name,
                price: req.body.product.price,
                description: req.body.product.description || null,
                idUser: req.body.product.idUser || req.body.product.iduser,
                tags: req.body.product.tags || req.body.product.tags.tag,
                token: req.headers.authorization as string
            }
            const response = await this.productRules.createProduct(input)

            res.send({message: response})
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send({ message: "Um erro inesperado ocorreu :/" })
            }
        }

    }

}