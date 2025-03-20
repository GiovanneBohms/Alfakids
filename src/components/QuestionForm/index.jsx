import { useEffect, useState } from "react"
import "./index.css"
import { ObjectiveQuestion } from "../ObjectiveQuestion";
import { DiscursiveQuestion } from "../DiscursiveQuestion";
import { createAnswer } from "../../services/AnswerService";
import { getCurrentStudentId } from "../../services/StudentService";
import { accomplishActivity } from "../../services/AccomplishmentsService";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../LoadingIcon";
<<<<<<< Updated upstream
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import "regenerator-runtime/runtime";
=======
import { ModalWindow } from "../ModalWindow";
>>>>>>> Stashed changes

export function QuestionForm({ questions, id_activity, isLoading, setIsLoading }){

    const navigate = useNavigate()

    const [answer, setAnswer] = useState("")
    const [questionAnswered, setQuestionAnswered] = useState(null)

    const [counterOfAnswersCreated, setCounterOfAnswersCreated] = useState(0)

    const [accomplish, setAccomplish] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    function speechSendActivity(){
        SpeechRecognition.stopListening()
        setAccomplish(true)
    }

    const commands = [
        {
            command: "Enviar atividade",
            callback: () => speechSendActivity()
        }
    ]

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

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

    function handlePageChange()
    {
        if (document.hidden)
        {
            setAccomplish(true);
        }
    }

    useEffect(() => {
        setCounterOfAnswersCreated(0)
    }, [])

    useEffect(() =>
    {
        document.addEventListener("visibilitychange", handlePageChange);

        return() =>
        { document.removeEventListener("visibilitychange", handlePageChange); };
    }, []);

    return(
        <div className="questionFormBody">
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="questionFormContainer">
                        {isModalOpen && <ModalWindow setIsModalOpen={setIsModalOpen}/>}

                        {
                            questions.map((question) => (
                                <div className="questionInputContainer">
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
                        <div className="footerButtonsContainer">
                            <button className="buttonCancel" onClick={() => navigate("/activities")}>Cancelar</button>
                            <button className="buttonSend" onClick={() => setAccomplish(true)}>Enviar</button>
                        </div>
                    </div>       
            }
        </div>
    )
}