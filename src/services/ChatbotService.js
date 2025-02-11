import { getCurrentStudentId } from "./StudentService";
import { api } from "../apiBaseURL";
import { data } from "react-router-dom";

const modelURL = "http://localhost:11434/api/generate"

export async function sendMessage(message){
    let data = {};
    data.model = "AlfaCopilot"
    data.prompt = message
    data.stream = false

    const response = await api.post(modelURL, data)

    return response.data.response
}