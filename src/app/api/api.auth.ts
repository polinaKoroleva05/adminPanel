import { instance } from "./api.config.ts";

const AuthService = {

    login (loginData: {email: string, password: string}) {
        return instance.post("/api/v1/auth/login", loginData, {headers: {  'Content-Type': 'application/json'}})
    },
    
    logout() {
        return instance.post("/api/v1/auth/logout")
    }
}

export default AuthService