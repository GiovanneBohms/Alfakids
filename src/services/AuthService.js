import { api } from "../apiBaseURL";

export async function Login(email, password){
    const response = await api.post("/auth/login", {email, password})
    const token = response.data.token
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`

    return token
}