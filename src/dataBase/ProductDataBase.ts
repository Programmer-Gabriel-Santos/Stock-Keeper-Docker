import { IProductDB, ITag, ITagDB, Product } from "../models/Products"
import BaseDataBase from "./BaseDataBase"

export class ProductDataBase extends BaseDataBase {
    private static TABLE_PRODUCTS = "products"
    private static TABLE_TAGS = "products_tags"
    
    static toProductDBModel = (product: Product) => {
        const productDB: IProductDB = {
            id_product: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            id_user: product.getIdUser()
        }

        return productDB as IProductDB
    }

    static toTagDBModel = (tag: ITag | any) => {
        const tagDB: ITagDB = {
            id_product: tag.idProduct,
            tag: tag.tag
        }

        return tagDB as ITagDB
    }

    insertProduct = async (product: IProductDB): Promise<void> => {
        await this.getConnection()(ProductDataBase.TABLE_PRODUCTS)
            .insert(product)
    }

    insertTag = async (tag: ITagDB): Promise<void> => {
    
            await this.getConnection()(ProductDataBase.TABLE_TAGS)
                .insert(tag)
    }

    findByName = async (name: string):Promise<IProductDB> => {
        const productDB: IProductDB[] = await this.getConnection()(ProductDataBase.TABLE_PRODUCTS)
            .select()
            .where({ name })
        return productDB[0]
    }
}