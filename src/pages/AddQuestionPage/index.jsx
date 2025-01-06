import { useParams } from "react-router-dom"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import "./index.css"
import { useState } from "react"

export function AddQuestionPage(){
    const { id_activity } = useParams()
    const [type, setType] = useState("discursive")

    const [statement, setStatement] = useState(null)
    const [answer1, setAnswer1] = useState(null)
    const [answer2, setAnswer2] = useState(null)
    const [answer3, setAnswer3] = useState(null)
    const [answer4, setAnswer4] = useState(null)
    const [right_answer, setRight_answer] = useState(null)
    const [expected_answer, setExpected_answer] = useState(null)

    return (
        <div className="addQuestionBody">
            <ProfessorDashBoard />
            <div className="addQuestionSection">
                <div className="addQuestionForm">
                    <label>Type:</label>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="">Select a type</option>
                        <option value="objective">Objective</option>
                        <option value="discursive">Discursive</option>
                    </select>
                    {

                        //-------------------DISCURSIVE-----------------------------------------

                        type === "discursive" ?
                        <div className="discursiveAnswer">
                            <div className="discursiveInputContainer">
                                <label>Expected Answer:</label>
                                <textarea onChange={(e) => setExpected_answer(e.target.value)} id="inputDiscursiveAnswer" type="text" />
                            </div>
                        </div>
                        :   

                        //-------------------OBJECTIVE-----------------------------------------

                        <div className="objectiveAnswer">
                            <div className="objectiveOptionsContainer">
                                <div className="answerContainer">
                                    <label>Answer 1</label>
                                    <input onChange={(e) => setAnswer1(e.target.value)} />
                                    <label>Answer 2</label>
                                    <input onChange={(e) => setAnswer2(e.target.value)} />
                                </div>
                                <div className="answerContainer">
                                    <label>Answer 3</label>
                                    <input onChange={(e) => setAnswer3(e.target.value)} />
                                    <label>Answer 4</label>
                                    <input onChange={(e) => setAnswer4(e.target.value)} />
                                </div>
                            </div>
                            <div className="rightAnswerContainer">
                                <label>Right Answer</label>
                                <input onChange={(e) => setRight_answer(e.target.value)} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}