import * as xml2js from 'xml2js'


export interface ITag {
    idProduct: string,
    tag: string
}

export interface ITagDB{
    id_product: string,
    tag: string
}

interface Tag{
    tag: string | []
}

export interface ITagInputJson {
    tags: [] | {tag: string}
}

export interface ITagInputXml {
    tags:{ tag: Tag }
}

export interface IProduct {
    id: string,
    name: string,
    price: number,
    description: string | null,
    idUser: string
}

export interface IProductInputDTO {
    name: string,
    price: number,
    description: string | null,
    idUser: string,
    tags: any,
    token: string
}

export interface IProductDB {
    id_product: string,
    name: string,
    price: number,
    description: string | null,
    id_user: string
}

export interface IOutputDTO {
    message: string
}

export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private description: string | null,
        private idUser: string,
    ) { }

    public getId = () => {
        return this.id
    }

    public getName = () => {
        return this.name
    }

    public getPrice = () => {
        return this.price
    }

    public getDescription = () => {
        return this.description
    }

    public getIdUser = () => {
        return this.idUser
    }

    public setName = (newName: string) => {
        this.name = newName
    }

    public setPrice = (newPrice: number) => {
        this.price = newPrice
    }

    public setDescription = (newDescription: string) => {
        this.description = newDescription
    }

    public setIdUser = (idUser: string) => {
        this.idUser = idUser
    }

    static toProductModel = (product: any) => {
        return new Product(
            product.id,
            product.name,
            product.price,
            product.description,
            product.idUser
        )
    }
}