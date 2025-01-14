import { api } from "../apiBaseURL"

export async function getAnswerByQuestionAndStudentId(idQuestion, idStudent){
    const response = await api.get(`/answer/findByQuestionAndStudentId/${idQuestion}/${idStudent}`)
    
    return response.data.answer
}

export async function createAnswer(answer){
    const response = await api.post("/answer/register", answer)
    
    console.log(response.data.answer)
}