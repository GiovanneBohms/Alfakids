import "./index.css"

export function AnswerForm({ answer }){
    return(
        <div className="answerFormContainer">
            <div className="answerFormStatementContainer">
                <p>{answer.statement}</p>
            </div>
            {
                //-------------------DISCURSIVE----------------------------------------

                answer.type === "discursive" ?
                    <div className="answerFormDiscursiveAnswer">
                        <div className="discursiveInputContainer">
                            <textarea id="inputDiscursiveAnswer" value={answer.expected_answer} disabled type="text" />
                        </div>
                        <div className="discursiveInputContainer">
                            <label>Student Answer:</label>
                            <textarea id="" value={answer.student_answer} disabled type="text"></textarea>
                        </div>
                    </div>
                :   

                //-------------------OBJECTIVE-----------------------------------------

                    <div className="answerFormObjectiveAnswer">
                        <div className="objectiveOptionsContainer">
                            <div className="buttonContainer">
                                <button>{answer.answer1}</button>
                                <button>{answer.answer2}</button>
                            </div>
                            <div className="buttonContainer">
                                <button>{answer.answer3}</button>
                                <button>{answer.answer4}</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}