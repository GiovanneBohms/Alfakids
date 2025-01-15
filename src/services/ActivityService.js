import { api } from "../apiBaseURL";

export async function getActivitiesByClassroomId(idClassroom){
    const response = await api.get(`/activity/findByClassroomId/${idClassroom}`)

    return response.data.activities
}

export async function getUnaccomplishedActivities(idClassroom, idStudent){
    const response = await api.get(`/activity/findAllUnaccomplished/${idClassroom}/${idStudent}`)

    return response.data.activities
}

export async function getAccomplishedActivities(idStudent){
    const response = await api.get(`/activity/findAllAccomplished/${idStudent}`)

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

export async function initializeActivity(title, id_subject, id_professor){
    const response = await api.post("/activity/initialize", {title, id_subject, id_professor})

    console.log(response.data.activity)
}

export async function distributeActivity(id_classroom, id_activity){
    const response = await api.post("/activity/distribute", {id_classroom, id_activity})

    console.log(response.data.distribution)
}

export async function deleteActivity(id_activity){
    const response = await api.delete(`/activity/delete/${id_activity}`)

    console.log(response.data)
}