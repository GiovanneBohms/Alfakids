import { useEffect, useState } from "react"
import "./index.css"
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export function QuestionForm({questions}){

    const [answer, setAnswer] = useState("")
    const [questionAnswered, setQuestionAnswered] = useState(null)

    function clearDiscursiveAnswer(){
        const textarea = document.getElementById("inputDiscursiveAnswer")

        textarea.value = ""
        setAnswer("")
    }

    function handleSubmit(event){
        event.preventDefault()
    }

    return(
        <div className="questionFormBody">
            {
                questions.map((question) => (
                    <div className="questionFormContainer">
                        <div className="statementContainer">
                            <p>{question.statement}</p>
                        </div>
                        <form onSubmit={(event) => handleSubmit(event)}>
                            {
                                question.type === "discursive" ?
                                    <div className="discursiveAnswer">
                                        <div className="discursiveInputContainer">
                                            <textarea id="inputDiscursiveAnswer" name="" onChange={(e) => setAnswer(e.target.value)} type="text" />
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
                        </form>
                    </div>
                ))
            }
        </div>
    )
}