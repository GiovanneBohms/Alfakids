import { api } from "../apiBaseURL";

export async function getClassroomById(idClassroom){
    const response = await api.get(`/classroom/findById/${idClassroom}`)

    return response.data.classroom
}

export async function getClassroomsByStudentId(idStudent){
    const response = await api.get(`/classroom/findByStudentId/${idStudent}`)

    return response.data.classrooms
}

export async function getClassroomsByProfessorId(idProfessor){
    const response = await api.get(`/classroom/findByProfessorId/${idProfessor}`)

    return response.data.classrooms
}

export async function initializeClassroom(number, year, id_professor){
    const response = await api.post("/classroom/initialize", {number, year, id_professor})

    console.log(response.data.classroom)
}

export async function allocateStudentInClassroom(id_classroom, id_student){
    const response = await api.post("/classroom/allocateStudentInClassroom", {id_classroom, id_student})

    console.log(response.data.allocation)
}