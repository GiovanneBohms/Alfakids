import { api } from "../apiBaseURL";

export async function Login(email, password){
    const response = await api.post("/auth/login", {email, password})
    const token = response.data.token

    localStorage.setItem("token", token)
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}