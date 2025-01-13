import { api } from "../apiBaseURL"

export async function getAnswerByQuestionAndStudentId(idQuestion, idStudent){
    const response = await api.get(`/answer/findByQuestionAndStudentId/${idQuestion}/${idStudent}`)
    
    return response.data.answer
}