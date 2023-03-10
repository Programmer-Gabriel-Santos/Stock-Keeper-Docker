import { IUserDB, User } from "../models/User"
import  BaseDatabase  from './BaseDataBase'

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    toUserDBModel = (user: User) => {
        const userDB: IUserDB = {
            id_user: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        return userDB
    }

    findByEmail = async (email: string): Promise<IUserDB> => {
        const userDB: IUserDB[] = await this.getConnection()(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })

        return userDB[0] 
    }

    insertUser = async (user: User): Promise<void> => {
        const userDB = this.toUserDBModel(user)

        await this.getConnection()(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }
}