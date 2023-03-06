import { Router } from 'express'
import { UserRules } from '../rules/UserRules'
import { UserDatabase } from '../dataBase/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'
import { UserController } from '../controller/UserController'

export const userRouter = Router()

const userRules = new UserController(
    new UserRules(
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()  
    )
       
)

userRouter.post("/signup", userRules.signup)

userRouter.post("/login", userRules.login)