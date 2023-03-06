import { IProductDB, ITag, ITagDB } from "../../../src/models/Products"
import { productDBMock } from "./productsMock"

export class ProductDataBaseMock{
    
    static toProductDBModel = (product: IProductDB): IProductDB => {
        return product
    }

    static toTagDBModel = (tag: ITagDB): ITagDB => {
        return tag
    }

    insertProduct =  (product: IProductDB) => {}

    insertTag =  (tag: ITagDB) => {}

    findByName =  (name: string):IProductDB | null => {
        if(name == productDBMock.name){
            return productDBMock
        }
        return null
    }
}