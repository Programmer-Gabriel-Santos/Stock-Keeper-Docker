import { BaseError } from "../../src/errors/BaseError"
import { ProductRules } from "../../src/rules/ProductRules"
import { ProductDataBaseMock } from "../Mocks/ProductDataBaseMock/ProductDataBaseMock"
import { AuthenticatorMock } from "../Mocks/servicesMock/AuthenticatorMock"
import { IdGeneratorMock } from "../Mocks/servicesMock/idGeneratorMock"

describe("testando a classe ProductRules com método createProduct", () => {
    const productRules = new ProductRules(
        new ProductDataBaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("testando o método createProduct, deve obter sucesso", async () => {
        expect.assertions(1)

        const input = {
            name: "product teste",
            price: 100,
            description: "product teste",
            idUser: "1",
            tags: [{tag:"tag1"}, {tag:"tag2"}, {tag:"tag3",}],
            token: "ADMIN"
        }

        const output = await productRules.createProductTest(input)
        expect(output.message).toBe("Produto cadastrado com sucesso!")
    })

    test("testando erro para algum campo faltando", async () => {
        expect.assertions(2)

        try {
            const input = {
                price: 100,
                description: "product teste",
                idUser: "1",
                tags: [{ tag: "tag1" }, { tag: "tag2" }, { tag: "tag3", }],
                token: "ADMIN"
            }
            await productRules.createProductTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test(
        `testando erro se typef de: name, description, idUser, tags ou token !== string ou
        (typeof price !== 'number')`, async () => {
        expect.assertions(2)

         try {
            const input = {
                name: 73273,
                price: "teste typeof",
                description: "product teste",
                idUser: 1,
                tags: [{ tag: "tag1" }, { tag: "tag2" }, { tag: "tag3", }],
                token: "ADMIN"
            }
            await productRules.createProductTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro se o token do usuário não for válido", async () => {
        expect.assertions(2)

         try {
            const input = {
                name: "product teste",
                price: 100,
                description: "product teste",
                idUser: "1",
                tags: [{ tag: "tag1" }, { tag: "tag2" }, { tag: "tag3", }],
                token: "teste"
            }
            await productRules.createProductTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
        }
    })

    test("testando erro se o usuário tentar cadastrar um produto mas não é admin", async () => {
        expect.assertions(2)

         try {
            const input = {
                name: "product teste",
                price: 100,
                description: "product teste",
                idUser: "1",
                tags: [{ tag: "tag1" }, { tag: "tag2" }, { tag: "tag3", }],
                token: "NORMAL"
            }
            await productRules.createProductTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Permissão insuficiente")
                expect(error.statusCode).toBe(403)
            }
        }
    })

    test("testando erro se o produto já estiver cadastrado", async () => {
        expect.assertions(2)

        try {
            const input = {
            name: "product mock",
            price: 100,
            description: "product teste",
            idUser: "1",
            tags: [{tag:"tag1"}, {tag:"tag2"}, {tag:"tag3",}],
            token: "ADMIN"
            }
            await productRules.createProductTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Recurso já existe")
                expect(error.statusCode).toBe(409)
            }
        }
    })

    test("teste de erro para um formato de tags inválido, seja json ou xml", async()=>{
        expect.assertions(2)

        try {
            const input = {
                name: "product teste",
                price: 100,
                description: "product teste",
                idUser: "1",
                tags: {tag: {tag: "test"}},
                token: "ADMIN"
            }

            await productRules.createProductTest(input)
            
        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})