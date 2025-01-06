import { api } from "../apiBaseURL";

export async function getQuestionsByActivityId(idActivity){
    const response = await api.get(`/question/findByActivityId/${idActivity}`)

    return response.data.questions
}

export async function getQuestionById(idQuestion){
    const response = await api.get(`/question/findById/${idQuestion}`)

    return response.data.question
}

export async function editQuestion(idQuestion, question){
    console.log(question)
    const response = await api.put(`/question/update/${idQuestion}`, question)
    console.log(response.data.question)
}

export async function deleteQuestion(idQuestion){
    const response = await api.delete(`/question/delete/${idQuestion}`)
    console.log(response.data)
}