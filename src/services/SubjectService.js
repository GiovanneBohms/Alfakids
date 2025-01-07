import { api } from "../apiBaseURL";

export async function findAllSubjects(){
    const response = await api.get("/subject/findAll")

    return response.data.subjects
}