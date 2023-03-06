import { IUserDB, User } from "../../../src/models/User";
import { userDBError, userDBMock } from "./userDataMock";

export class UserDataBaseMock {

    public static toUserDBModel = (user: IUserDB): IUserDB => {
        return user
    }
    
    findByEmail = async (email: string): Promise<IUserDB | undefined> => {
        const userDB = userDBMock

        if(userDB.email !== email) {
            return undefined
        } 
        return userDB
    }

    insertUser = async (user: User): Promise<void> => { }
}