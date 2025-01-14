import { api } from "../apiBaseURL";

export async function getAllStudentsByActivityId(idActivity){
    const response = await api.get(`/accomplishment/findStudentsByActivityId/${idActivity}`)

    return response.data.students;
}

export async function accomplishActivity(id_activity, id_student){
    const response = await api.post("/accomplishment/register", {id_activity, id_student})

    console.log(response.data.accomplishment)
}