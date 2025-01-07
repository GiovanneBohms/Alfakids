import { useNavigate, useParams } from "react-router-dom"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import "./index.css"
import { useState } from "react"
import { createQuestion } from "../../services/QuestionService"

export function AddQuestionPage(){

    const navigate = useNavigate()
    const { id_activity } = useParams()
    const [type, setType] = useState("discursive")

    const [statement, setStatement] = useState(null)
    const [answer1, setAnswer1] = useState(null)
    const [answer2, setAnswer2] = useState(null)
    const [answer3, setAnswer3] = useState(null)
    const [answer4, setAnswer4] = useState(null)
    const [right_answer, setRight_answer] = useState(null)
    const [expected_answer, setExpected_answer] = useState(null)

    function handleAddQuestion(){
        if(type === "discursive"){
            createQuestion({statement, type, id_activity, expected_answer}).then(() => {
                navigate(`/activities/management/edit/${id_activity}`)
            }).catch((error) => {
                console.log(error.message)
            })
        } else{
            createQuestion({statement, type, id_activity, answer1, answer2, answer3, answer4, right_answer}).then(() => {
                navigate(`/activities/management/edit/${id_activity}`)
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }

    return (
        <div className="addQuestionBody">
            <ProfessorDashBoard />
            <div className="addQuestionSection">
                <h1>Add Question</h1>
                <div className="addQuestionForm">
                    <div className="typeInputContainer">
                        <label>Type:</label>
                        <select className="typeSelect" onChange={(e) => setType(e.target.value)}>
                            <option value="discursive">Discursive</option>
                            <option value="objective">Objective</option>
                            
                        </select>
                    </div>
                    <div className="discursiveInputContainer">
                        <label>Statement:</label>
                        <textarea onChange={(e) => setStatement(e.target.value)} type="text" />
                    </div>
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
                    <div className="createBtnSection">
                        <button onClick={() => handleAddQuestion()}>Add</button>
                        <button onClick={() => navigate(`/activities/management/edit/${id_activity}`)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}