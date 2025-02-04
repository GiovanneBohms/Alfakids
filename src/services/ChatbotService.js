import { getCurrentStudentId } from "./StudentService";
import { api } from "../apiBaseURL";
import { data } from "react-router-dom";


export async function sendMessage(message){
    let data = {};
    data.sender = getCurrentStudentId()
    data.message = message

    console.log(data)
    const response = await api.post("/chatbot/message", data)

    return response.data.response
}