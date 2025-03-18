import { useEffect, useState } from "react"
import "./index.css"

export function ObjectiveQuestion({ accomplish, question, handleSubmitAnswer }){

    const [answer, setAnswer] = useState("")

    useEffect(() => {
        if(accomplish == true){
            handleSubmitAnswer(question.id, answer)
        }
    }, [accomplish])

    return(
        <div className="objectiveAnswer">
            <div className="objectiveOptionsContainer">
                <div className="buttonContainer">
                    {
                        answer == question.answer1 ?
                            <button className="objectiveOption activeOption" onClick={() => setAnswer(question.answer1)}>{question.answer1}</button>
                        :
                            <button className="objectiveOption" onClick={() => setAnswer(question.answer1)}>{question.answer1}</button>
                    }
                    {
                        answer == question.answer2 ?
                            <button className="objectiveOption activeOption" onClick={() => setAnswer(question.answer2)}>{question.answer2}</button>
                        :
                            <button className="objectiveOption" onClick={() => setAnswer(question.answer2)}>{question.answer2}</button>
                    }
                </div>
                <div className="buttonContainer">
                    {
                        answer == question.answer3 ?
                            <button className="objectiveOption activeOption" onClick={() => setAnswer(question.answer3)}>{question.answer3}</button>
                        :
                            <button className="objectiveOption" onClick={() => setAnswer(question.answer3)}>{question.answer3}</button>
                    }
                    {
                        answer == question.answer4 ?
                            <button className="objectiveOption activeOption" onClick={() => setAnswer(question.answer4)}>{question.answer4}</button>
                        :
                            <button className="objectiveOption" onClick={() => setAnswer(question.answer4)}>{question.answer4}</button>
                    }
                </div>
            </div>
        </div>
    )
}