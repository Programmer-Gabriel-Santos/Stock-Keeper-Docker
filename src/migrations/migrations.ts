import BaseDataBase from "../dataBase/BaseDataBase";

export class Migrations extends BaseDataBase{
    
    private connection = this.getConnection()

    createTables = async (): Promise<void> =>{
        
        const usersTableExists = await this.connection.schema.hasTable("users")
        
        if(!usersTableExists){
            console.log("Criando tabela de usuários...")

            await this.connection.schema.createTable("users", (table) => {
                table.string("id_user", 50).primary();
                table.string("name", 50).notNullable();
                table.string("email", 100).notNullable().unique();
                table.string("password", 100).notNullable();
                table.enum("role", ["NORMAL", "ADMIN"]).defaultTo("NORMAL");
            });
            console.log("Criando tabela de produtos...")
            
            await this.connection.schema.createTable("products", (table) => {
                table.string("id_product", 50).primary();
                table.string("name", 50).notNullable().unique();
                table.string("description", 255);
                table.string("price", 10).notNullable();
                table.string("id_user", 50).notNullable();
                table.foreign("id_user").references("id_user").inTable("users");
            });
            console.log("Criando tabela de tags...")

            await this.connection.schema.createTable("products_tags", (table) => {
                table.string("id_product", 50).notNullable();
                table.string("tag", 50).notNullable();
                table.foreign("id_product").references("id_product").inTable("products");
            });
            console.log("Tabelas criadas")
        }
        
    }  
}

