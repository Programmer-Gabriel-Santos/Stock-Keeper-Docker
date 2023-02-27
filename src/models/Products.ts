export interface IProduct {
    id: string,
    name: string,
    price: number,
    description: string,
    idUser: string
}

export interface IProductDB {
    id: string,
    name: string,
    price: number,
    description: string,
    id_user: string
}

export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private description: string,
        private idUser: string
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