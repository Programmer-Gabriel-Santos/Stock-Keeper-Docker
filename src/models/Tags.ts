export interface ITag{
    idProduct: string,
    tag: string
}

export interface ITagDB{
    id_product: string,
    tag: string
}

export class Tag {
    constructor(
        private idProduct: string,
        private tag: string
    ) {}

    public getIdProduct = () => {
        return this.idProduct
    }

    public getTag = () => {
        return this.tag
    }

    public setIdProduct = (idProduct: string) => {
        this.idProduct = idProduct
    }

    public setTag = (tag: string) => {
        this.tag = tag
    }
}