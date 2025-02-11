import { getCurrentStudentId } from "./StudentService";
import { api } from "../apiBaseURL";
import { data } from "react-router-dom";

const modelURL = "http://localhost:11434/api/generate"

export async function sendMessage(message){
    let data = {};
    data.model = "llama3.2:3b"
    data.prompt = message
    data.stream = false

    console.log(data)
    const response = await api.post(modelURL, data)

    console.log(response.data)
    return response.data.response
}