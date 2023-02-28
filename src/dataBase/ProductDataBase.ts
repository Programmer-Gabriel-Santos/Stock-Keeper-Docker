import { IProductDB, Product } from "../models/Products"
import { ITag, ITagDB } from "../models/Tags"
import BaseDataBase from "./BaseDataBase"

export class ProductDataBase extends BaseDataBase {
    private static TABLE_PRODUCTS = "products"
    private static TABLE_TAGS = "products_tags"
    
    toProductDBModel = (product: Product) => {
        const productDB: IProductDB = {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
            description: product.getDescription(),
            id_user: product.getIdUser()
        }

        return productDB
    }

    toTagDBModel = (tag: ITag) => {
        const tagDB: ITagDB = {
            id_product: tag.idProduct,
            tag: tag.tag
        }
        return tagDB
    }

    insertProduct = async (product: Product) => {
        const productDB = this.toProductDBModel(product)

        await this.getConnection()(ProductDataBase.TABLE_PRODUCTS)
            .insert(productDB)
    }

    insertTags = async (tag: ITag) => {
        const tagDB = this.toTagDBModel(tag)

        await this.getConnection()(ProductDataBase.TABLE_TAGS)
            .insert(tagDB)
    }

    findByName = async (name: string) => {
        const productDB: IProductDB[] = await this.getConnection()(ProductDataBase.TABLE_PRODUCTS)
            .select()
            .where({ name })
        return productDB[0]
    }
}

