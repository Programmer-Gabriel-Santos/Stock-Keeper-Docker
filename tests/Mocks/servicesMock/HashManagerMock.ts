export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if(plaintext == "123456"){
            return "admin-hash"
        }

        return "normal-hash"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if(plaintext == "123456" && hash == "123456"){
            return true
        }

        return false
    }
}