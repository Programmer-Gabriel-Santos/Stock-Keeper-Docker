import { BaseError } from "./BaseError"

export class IsEmailExist extends BaseError {
    constructor(message: string = "Email já cadastrado.") {
        super(422, message)
    }
}