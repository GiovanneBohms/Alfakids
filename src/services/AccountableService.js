import { api } from "../apiBaseURL";
import { getCurrentStudentId } from "./StudentService";

export async function getAccountablesByStudentId(){
    const response = await api.get(`/accountable/findByStudentId/${getCurrentStudentId()}`)

    return response.data.accountables
}

export async function createAccountable(accountable){
    const response = await api.post("/accountable/register", accountable)

    console.log(response.data.accountable)
}