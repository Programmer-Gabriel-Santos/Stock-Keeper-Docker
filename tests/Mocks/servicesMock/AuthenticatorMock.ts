import { USER_ROLES } from "../../../src/models/User"

export interface ITokenPayload {
    id: string,
    role: USER_ROLES
}

export class AuthenticatorMock {
    generateToken = (payload: ITokenPayload): string => {
       switch (payload.role){
        case USER_ROLES.ADMIN:
            return "ADMIN"
        default:
            return "NORMAL"
       }
    }

    getTokenPayload = (token: string): ITokenPayload | null => {
        switch(token){
            case "ADMIN":
                const adminPayload: ITokenPayload ={
                    id: "1",
                    role: USER_ROLES.ADMIN
                }
                return adminPayload
            
            case "NORMAL":
                const normalPayload: ITokenPayload ={
                    id: "2",
                    role: USER_ROLES.NORMAL
                }
                return normalPayload
            
            default:
                return null
        }
    }
}