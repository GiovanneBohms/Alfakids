import { api } from "../apiBaseURL";
import { getCurrentStudentId } from "./StudentService";

export async function getAccountablesByStudentId(idStudent){
    const response = await api.get(`/accountable/findByStudentId/${idStudent}`)

    return response.data.accountables
}

export async function createAccountable(accountable){
    const response = await api.post("/accountable/register", accountable)

    console.log(response.data.accountable)
}

export async function deleteAccountable(id_accountable){
    const response = await api.delete(`/accountable/delete/${id_accountable}`)

    console.log(response.data)
}