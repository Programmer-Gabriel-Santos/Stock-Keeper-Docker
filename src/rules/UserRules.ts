import { UserDatabase } from '../dataBase/UserDatabase'
import { AuthenticationError } from "../errors/AuthenticationError"
import { EmailInvalid } from "../errors/EmailInvalid"
import { ParamsError } from "../errors/ParamsError"
import { AuthorizationError } from '../errors/AuthorizationError'
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO, User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { IdGeneratorMock } from '../../tests/Mocks/servicesMock/idGeneratorMock'
import { UserDataBaseMock } from '../../tests/Mocks/UserDataBaseMock/UserDataBaseMock'
import { HashManagerMock } from '../../tests/Mocks/servicesMock/HashManagerMock'
import { AuthenticatorMock } from '../../tests/Mocks/servicesMock/AuthenticatorMock'
import { IsEmailExist } from '../errors/IsEmailExist'

export class UserRules {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        //      -----------------------
        // Mocks:
        // private userDatabase: UserDataBaseMock,
        // private idGenerator: IdGeneratorMock,
        // private hashManager: HashManagerMock,
        // private authenticator: AuthenticatorMock

    ) {}

            // // trocar o método login por loginTest para que os testes de erro funcionem

            // signupTest = async (input: any) => {
                

    signup = async(input: SignupInputDTO) =>{
        const {name, email, password} = input

        if (!name || !email || !password) {
            throw new ParamsError()
        }

        if (typeof name !== "string" || name.length < 5) {
            throw new ParamsError()
        }

        if (typeof email !== "string" || email.length < 12) {
            throw new ParamsError()
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new EmailInvalid()
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new ParamsError()
        } 

        const userDB = await this.userDatabase.findByEmail(email)
        
        if(userDB){
            throw new IsEmailExist() 
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id, 
            name,
            email,
            hashedPassword,
            USER_ROLES.ADMIN
        )

        await this.userDatabase.insertUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: SignupOutputDTO = {
            message: "Cadastro realizado com sucesso!",
            token
        }

        return response
    }
       // // trocar o método login por loginTest para que os testes de erro funcionem

    // loginTest = async (input: any) => {
        

    login = async(input: LoginInputDTO)=>{
        const {email, password} = input

        if (!email || !password) {
            throw new ParamsError()
        }

        if (typeof email !== "string" || email.length < 12) {
            throw new EmailInvalid()
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new EmailInvalid()
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new AuthenticationError()
        }

        const userDB = await this.userDatabase.findByEmail(email)

        if(!userDB){
            throw new AuthenticationError()
        }

        const user = User.toUserModel(userDB)

        const isPasswordIsCorrect = await this.hashManager.compare(password, user.getPassword())

        if(!isPasswordIsCorrect){
            throw new AuthorizationError()
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: LoginOutputDTO = {
            message: "Login realizado com sucesso!",
            token
        }

        return response
    }

}