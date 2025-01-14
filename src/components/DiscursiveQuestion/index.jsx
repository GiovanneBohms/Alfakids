import { useEffect, useState } from "react"
import "./index.css"

export function DiscursiveQuestion({ accomplish, question, handleSubmitAnswer }){

    const [answer, setAnswer] = useState(null)

    useEffect(() => {
        if(accomplish == true){
            handleSubmitAnswer(question.id, answer)
        }
    }, [accomplish])

    return(
        <div className="discursiveAnswer">
            <div className="discursiveInputContainer">
                <textarea id="inputDiscursiveAnswer" onChange={(e) => setAnswer(e.target.value)} name="" type="text" />
            </div>
        </div>
    )
}