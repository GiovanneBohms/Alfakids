import { api } from "../apiBaseURL";

export async function getActivitiesByClassroomId(idClassroom){
    const response = await api.get(`/activity/findByClassroomId/${idClassroom}`)

    return response.data.activities
}

export async function getActivityById(idActivity){
    const response = await api.get(`/activity/findById/${idActivity}`)

    return response.data.activity
}

export async function getActivitiesByProfessorId(idProfessor){
    const response = await api.get(`/activity/findByProfessorId/${idProfessor}`)

    return response.data.activities
}