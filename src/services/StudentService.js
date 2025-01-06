import { jwtDecode } from "jwt-decode";
import { api } from "../apiBaseURL";

export async function getAllStudents(){
    const response = await api.get("/student/findAll")

    return response.data.students
}

export async function getStudentsByClassroomId(idClassroom){
    const response = await api.get(`/student/findByClassroomId/${idClassroom}`)

    return response.data.students
}

export function getCurrentStudentId(){
    const token = localStorage.getItem("token")

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

export async function getStudentById(idStudent){
    const response = await api.get(`/student/findById/${idStudent}`)

    return response.data.student
}