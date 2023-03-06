// import BaseDataBase from "../dataBase/BaseDataBase";

// export class Migrations extends BaseDataBase{
//     createTables = async () =>{
//         await this.getConnection()
//             .raw(`          
//                 CREATE TABLE IF NOT EXISTS users (
//                     id_user VARCHAR(50) PRIMARY KEY,
//                     name VARCHAR(50) NOT NULL,
//                     email VARCHAR(100) NOT NULL UNIQUE,
//                     password VARCHAR(100) NOT NULL,
//                     role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL"
//                 );

//                 CREATE TABLE IF NOT EXISTS products (
//                     id_product VARCHAR(50) PRIMARY KEY,
//                     name VARCHAR(50) NOT NULL UNIQUE,
//                     description VARCHAR(255),
//                     price VARCHAR(10) NOT NULL,
//                     id_user VARCHAR(50) NOT NULL,
//                     FOREIGN KEY (id_user) REFERENCES users(id_user)
//                 );

//                 CREATE TABLE IF NOT EXISTS products_tags (
//                     id_product VARCHAR(50) not null,
//                     tag VARCHAR(50) NOT NULL,
//                     FOREIGN KEY (id_product) REFERENCES products(id_product)
//                 );
//             `)
//         console.log("Tabelas criadas")
//     }
// }

// import { Knex } from "knex"
import BaseDataBase from "../dataBase/BaseDataBase";

export class Migrations extends BaseDataBase{
    
    private connection = this.getConnection()

    createTables = async (): Promise<void> =>{
        
        const usersTableExists = await this.connection.schema.hasTable("users")
        
        if(!usersTableExists){
            await this.connection.schema.createTable("users", (table) => {

                table.string("id_user", 50).primary();
                table.string("name", 50).notNullable();
                table.string("email", 100).notNullable().unique();
                table.string("password", 100).notNullable();
                table.enum("role", ["NORMAL", "ADMIN"]).defaultTo("NORMAL");
            });
        
            await this.connection.schema.createTable("products", (table) => {
                table.string("id_product", 50).primary();
                table.string("name", 50).notNullable().unique();
                table.string("description", 255);
                table.string("price", 10).notNullable();
                table.string("id_user", 50).notNullable();
                table.foreign("id_user").references("id_user").inTable("users");
            });
        
            await this.connection.schema.createTable("products_tags", (table) => {
                table.string("id_product", 50).notNullable();
                table.string("tag", 50).notNullable();
                table.foreign("id_product").references("id_product").inTable("products");
            });
            console.log("Tabelas criadas")
        }
        
    }  
}

