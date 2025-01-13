import { api } from "../apiBaseURL";

export async function getAllStudentsByActivityId(idActivity){
    const response = await api.get(`/accomplishment/findStudentsByActivityId/${idActivity}`)

    return response.data.students;
}