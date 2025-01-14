import { api } from "../apiBaseURL";

export async function findAllSubjects(){
    const response = await api.get("/subject/findAll")

    return response.data.subjects
}

export async function getSubjectById(id_subject){
    const response = await api.get(`/subject/findById/${id_subject}`)

    return response.data.subject
}