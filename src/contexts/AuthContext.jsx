import { createContext, useEffect, useState } from "react";
import { getCurrentStudentId, getStudentById } from "../services/StudentService";
import { api } from "../apiBaseURL";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token){
            getStudentById(getCurrentStudentId()).then((data) => {
                setStudent(data)
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }, [])

    async function login(email, password){
        const response = await api.post("/auth/login", {email, password})
        const token = response.data.token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        
        localStorage.setItem("token", token)

        return token
    }

    return(
        <AuthContext.Provider value={{student, signed: !!student, login}}>
            {children}
        </AuthContext.Provider>
    )
}