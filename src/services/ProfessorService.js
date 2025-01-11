import { jwtDecode } from "jwt-decode"
import { api } from "../apiBaseURL"

export function getCurrentProfessorId(){
    const token = localStorage.getItem("professor_token")

    if(token){
        try{
            const decodedToken = jwtDecode(token)

            const id = decodedToken.sub.id

            return id
        } catch(error){
            console.log(error.message)
        }
    }
}

export async function getProfessorById(idProfessor){
    const response = await api.get(`/professor/findById/${idProfessor}`)

    return response.data.professor
}