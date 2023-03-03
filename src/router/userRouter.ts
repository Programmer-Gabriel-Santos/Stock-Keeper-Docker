import { Router } from 'express'
import { UserRules } from '../rules/UserRules'
import { UserDatabase } from '../dataBase/UserDatabase'
import { UserController } from '../controller/UserController'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const userRouter = Router()

const userController = new UserController(
    new UserRules(
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )
)

userRouter.get("/teste", (req, res) => {
    // console.log("teste!!!!!!!!!!!!!!")
    res.status(200).send({ message: "O teste funcionou!!!!!!" })  
})

userRouter.post("/signup", userController.signup)

userRouter.post("/login", userController.login)