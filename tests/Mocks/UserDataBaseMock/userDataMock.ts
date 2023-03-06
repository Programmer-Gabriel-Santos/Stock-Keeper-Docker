import { IUserDB, USER_ROLES } from "../../../src/models/User";

export const userDBMock: IUserDB = {
    id_user: "1",
    name: "user mock",
    email: "mock@gmail.com",
    password: "123456",
    role: USER_ROLES.ADMIN
}

export const userDBError: IUserDB = {
    id_user: "2",
    name: "user false",
    email: "user@gmail.com",
    password: "1234567",
    role: USER_ROLES.NORMAL
}