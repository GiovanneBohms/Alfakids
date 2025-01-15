import { api } from "../apiBaseURL"

export async function getAnswerByQuestionAndStudentId(idQuestion, idStudent){
    const response = await api.get(`/answer/findByQuestionAndStudentId/${idQuestion}/${idStudent}`)
    
    return response.data.answer
}

export async function createAnswer(answerObj){
    const response = await api.post("/answer/register", answerObj)
    
    console.log(response.data.answer)
}