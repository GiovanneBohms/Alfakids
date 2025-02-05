import { api } from "../apiBaseURL";
import { getCurrentStudentId } from "./StudentService";

export async function getAccountablesByStudentId(){
    const response = await api.get(`/accountable/findByStudentId/${getCurrentStudentId()}`)

    return response.data.accountables
}