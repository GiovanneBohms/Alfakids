import { getCurrentStudentId } from "./StudentService";
import { api } from "../apiBaseURL";
import { data } from "react-router-dom";


export async function sendMessage(message){

    data.studentId = getCurrentStudentId()
    data.message = message
    const response = await api.post("rest/webhook", chat)

    return response.data
}