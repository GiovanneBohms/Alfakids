import { createContext, useEffect, useState } from "react";
import { getCurrentStudentId, getStudentById } from "../services/StudentService";
import { api } from "../apiBaseURL";
import { getCurrentProfessorId, getProfessorById } from "../services/ProfessorService";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState(null)
    const [professor, setProfessor] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const student_token = localStorage.getItem("student_token")
        const professor_token = localStorage.getItem("professor_token")

        if(student_token){
            setIsLoading(true)
            getStudentById(getCurrentStudentId()).then((data) => {
                setStudent(data)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error.message)
            })
        }

        if(professor_token){
            setIsLoading(true)
            console.log("entrou")
            getProfessorById(getCurrentProfessorId()).then((data) => {
                setProfessor(data)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }, [])

    async function login_student(email, password){
        const response = await api.post("/auth/login/student", {email, password})
        const token = response.data.token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        
        localStorage.clear()
        localStorage.setItem("student_token", token)

        return token
    }

    async function login_professor(email, password){
        const response = await api.post("/auth/login/professor", {email, password})
        const token = response.data.token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        
        localStorage.clear()
        localStorage.setItem("professor_token", token)

        return token
    }

    async function logout(){
        localStorage.clear()
        location.reload()
    }

    return(
        <AuthContext.Provider value={{student, isLoading, student_signed: !!student, professor_signed: !!professor, login_student, login_professor, logout}}>
            {children}
        </AuthContext.Provider>
    )
}