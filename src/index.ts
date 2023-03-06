import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { userRouter } from './router/userRouter'
import { productRouter } from './router/productRouter'
import xmlparser from 'express-xml-bodyparser'
import { Migrations } from './migrations/migrations'
import knex, {Knex} from 'knex'

const migrations = new Migrations()

dotenv.config()

const app = express()

app.use(express.json());
app.use(xmlparser({explicitArray: false}));


app.use(cors()) 

app.listen(process.env.PORT || 3003, async() => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

migrations.createTables()


app.use("/user", userRouter)

app.use("/product", productRouter)