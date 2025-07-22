import { instance } from "./api.config.ts";

const AuthService = {

    login (loginData: {email: string, password: string}) {
        return instance.post("/api/v1/auth/login", loginData, {headers: {  'Content-Type': 'application/json'}})
    },
    
    logout() {
        return instance.post("/api/v1/auth/logout")
    },

    checkAuth(){
        return instance.get("/api/v1/auth/me").then(res=>res.data)
    }
}

export default AuthService