import { useEffect, useState } from "react"
import "./index.css"
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export function QuestionForm({question}){

    const [answer, setAnswer] = useState("")
    const [questionAnswered, setQuestionAnswered] = useState(null)

    function clearDiscursiveAnswer(){
        const textarea = document.getElementById("inputDiscursiveAnswer")

        textarea.value = ""
        setAnswer("")
    }
    
    function handleSendDiscursiveAnswer(){

        if(answer === question.expected_answer){
            setQuestionAnswered(true)
        } else{
            setQuestionAnswered(false)
        }
    }

    function handleSendObjectiveAnswer(questionAnswer){
        setAnswer(questionAnswer)

        if(questionAnswer === question.right_answer){
            setQuestionAnswered(true)
        } else{
            setQuestionAnswered(false)
        }
    }

    return(
        <div className="questionFormContainer">
            <div className="statementContainer">
                <p>{question.statement}</p>
                {
                    questionAnswered == null ?
                        null
                    :
                        questionAnswered == true ?
                            <p className="rightAnswerIcon"><FaCheck /></p>  
                        :
                            <p className="wrongAnswerIcon"><MdClose /></p>
                }
            </div>
            {
                question.type === "discursive" ?
                    <div className="discursiveAnswer">
                        <div className="discursiveInputContainer">
                            <textarea id="inputDiscursiveAnswer" onChange={(e) => setAnswer(e.target.value)} type="text" />
                        </div>
                        <div className="discursiveButtonSection">
                            <button onClick={() => handleSendDiscursiveAnswer()}>Enviar</button>
                            <button onClick={() => clearDiscursiveAnswer()}>Limpar</button>
                        </div>
                    </div>
                :   
                    <div className="objectiveAnswer">
                        <div className="objectiveOptionsContainer">
                            <div className="buttonContainer">
                                <button onClick={() => handleSendObjectiveAnswer(question.answer1)}>{question.answer1}</button>
                                <button onClick={() => handleSendObjectiveAnswer(question.answer2)}>{question.answer2}</button>
                            </div>
                            <div className="buttonContainer">
                                <button onClick={() => handleSendObjectiveAnswer(question.answer3)}>{question.answer3}</button>
                                <button onClick={() => handleSendObjectiveAnswer(question.answer4)}>{question.answer4}</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}