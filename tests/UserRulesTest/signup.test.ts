import { BaseError } from "../../src/errors/BaseError"
import { SignupInputDTO } from "../../src/models/User"
import { UserRules } from "../../src/rules/UserRules"
import { AuthenticatorMock } from "../Mocks/servicesMock/AuthenticatorMock"
import { HashManagerMock } from "../Mocks/servicesMock/HashManagerMock"
import { IdGeneratorMock } from "../Mocks/servicesMock/idGeneratorMock"
import { UserDataBaseMock } from "../Mocks/UserDataBaseMock/UserDataBaseMock"
import { userDBMock } from "../Mocks/UserDataBaseMock/userDataMock"

describe("testando a classe UserRules com método signup", () => {
    const userRules = new UserRules(
        new UserDataBaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test(
        "testando o método signup, deve obter sucesso, é retornado um objeto com 'token' e 'message'", async () => {
        expect.assertions(2)

        const input = {
            name: "user test",
            email: "test@gmail.com",
            password: "123456"
        }

        const response = await userRules.signupTest(input)
        expect(response.message).toBe("Cadastro realizado com sucesso!")
        expect(response.token).toBe("ADMIN")
    })


    test("testando erro para algum campo faltando", async () => {
        expect.assertions(2)
                
       try {
        const input = {
            email: "test@gmail.com",
            password: "12345"
        }
        await userRules.signupTest(input)
        
       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
       }
    })

    test("testando erro para o typeof de: name ser direfente de 'string', ou length < 5", async () => {
        expect.assertions(2)
        
       try {
        const input: SignupInputDTO = {
            name: "",
            email: "test@gmail.com",
            password: "12345"
        }
        await userRules.signupTest(input)
        
       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
       }
    })

    test("testando erro para o typeof de: email ser direfente de 'string', ou length < 12", async () => {
        expect.assertions(2)
        
       try {
        const input: SignupInputDTO = {
            name: "testtt",
            email: "t@gmail.com",
            password: "12345"
        }
        await userRules.signupTest(input)
        
       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
       }
    })

    test("testando erro para validação de email, se posui os caracteres de um email válido", async () => {
        expect.assertions(2)
        
       try {
        const input: SignupInputDTO = {
            name: "testtt",
            email: "testeDeEmail.com",
            password: "123456"
        }
        await userRules.signupTest(input)
        
       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Email não atende aos requisitos de um email válido.")
                expect(error.statusCode).toBe(422)
            }
       }
    })

    test("testando erro para typeof de 'password' !== 'string' ou length < 6", async () => {
        expect.assertions(2)
        
       try {
        const input: SignupInputDTO = {
            name: "testtt",
            email: "teste@gmail.com",
            password: '12345'
        }
        await userRules.signupTest(input)
        
       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
       }
    })

    test("testando erro para um email que já está cadastrado", async () => {
        expect.assertions(2)
        
       try {
        const input = userDBMock
        await userRules.signupTest(input)
        
       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Email já cadastrado.")
                expect(error.statusCode).toBe(422)
            }
       }
    })
})