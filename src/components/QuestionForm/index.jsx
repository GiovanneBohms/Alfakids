import { useEffect, useState } from "react"
import "./index.css"
import { ObjectiveQuestion } from "../ObjectiveQuestion";
import { DiscursiveQuestion } from "../DiscursiveQuestion";
import { createAnswer } from "../../services/AnswerService";
import { getCurrentStudentId } from "../../services/StudentService";
import { accomplishActivity } from "../../services/AccomplishmentsService";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../LoadingIcon";

export function QuestionForm({ questions, id_activity, isLoading, setIsLoading }){

    const navigate = useNavigate()

    const [answer, setAnswer] = useState("")
    const [questionAnswered, setQuestionAnswered] = useState(null)

    const [counterOfAnswersCreated, setCounterOfAnswersCreated] = useState(0)

    const [accomplish, setAccomplish] = useState(false)

    function clearDiscursiveAnswer(){
        const textarea = document.getElementById("inputDiscursiveAnswer")

        textarea.value = ""
        setAnswer("")
    }

    function handleSubmitAnswer(id_question, answer){
        const id_student = getCurrentStudentId()
        setIsLoading(true)
        
        createAnswer({id_activity, id_student, id_question, answer}).then(() => {
            if(questions[questions.length-1].id == id_question){
                handleAccomplishActivity()
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }

    function handleAccomplishActivity(){
        const id_student = getCurrentStudentId()

        accomplishActivity(id_activity, id_student).then(() => {
            navigate("/activities")
        }).catch((error) => {
            console.log(error.message)
            isLoading(false)
        })
    }

    useEffect(() => {
        setCounterOfAnswersCreated(0)
    }, [])

    return(
        <div className="questionFormBody">
            {
                isLoading ?
                    <LoadingIcon />
                :
                    questions.map((question) => (
                        <div className="questionFormContainer">
                            <div className="statementContainer">
                                <p>{question.statement}</p>
                            </div>
                            {
                                question.type === "discursive" ?
                                    <DiscursiveQuestion accomplish={accomplish} question={question} handleSubmitAnswer={handleSubmitAnswer} />
                                :   
                                    <ObjectiveQuestion accomplish={accomplish} question={question} handleSubmitAnswer={handleSubmitAnswer} />
                            }
                        </div>
                    ))
            }
            <button onClick={() => setAccomplish(true)}>Enviar</button>
        </div>
    )
}