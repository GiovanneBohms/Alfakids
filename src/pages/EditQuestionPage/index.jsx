import { useEffect, useState } from "react"
import { LoadingIcon } from "../../components/LoadingIcon"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import "./index.css"
import { useNavigate, useParams } from "react-router-dom"
import { editQuestion, getQuestionById } from "../../services/QuestionService"

export function EditQuestionPage(){
    const [isLoading, setIsLoading] = useState(true)
    const [question, setQuestion] = useState(null)

    const [statement, setStatement] = useState(null)
    const [answer1, setAnswer1] = useState(null)
    const [answer2, setAnswer2] = useState(null)
    const [answer3, setAnswer3] = useState(null)
    const [answer4, setAnswer4] = useState(null)
    const [right_answer, setRight_answer] = useState(null)
    const [expected_answer, setExpected_answer] = useState(null)

    const { id_question } =  useParams()
    const navigate = useNavigate()

    function fetchQuestion(){
        try{
            getQuestionById(id_question).then((question) => {
                setQuestion(question)
                setStatement(question.statement)
                if(question.type === "discursive"){
                    setExpected_answer(question.expected_answer)
                }
                else{
                    setAnswer1(question.answer1)
                    setAnswer2(question.answer2)
                    setAnswer3(question.answer3)
                    setAnswer4(question.answer4)
                    setRight_answer(question.right_answer)
                }
                setIsLoading(false)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    function handleDiscursiveEdit(){
        try{
            editQuestion(id_question, {statement, expected_answer}).then(() =>{
                navigate(`/activities/management/edit/${question.id_activity}`)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    function handleObjectiveEdit(){
        try{
            editQuestion(id_question,{statement, answer1, answer2, answer3, answer4, right_answer}).then(() =>{
                navigate(`/activities/management/edit/${question.id_activity}`)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchQuestion()
    }, [])

    
    return (
        <div className="editQuestionPageBody">
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="editQuestionPageSection">
                        <div>
                            <h1>Editar Questão</h1>
                        </div>
                        <div className="editQuestionPageForm">
                            <div className="editQuestionPageStatementTextArea">
                                <label>Enunciado:</label>
                                <textarea onChange={(e) => setStatement(e.target.value)} defaultValue={question.statement}></textarea>
                            </div>
                            {
                                //-------------------DISCURSIVE----------------------------------------

                                question.type === "discursive" ?
                                    <div className="discursiveAnswer">
                                        <div className="discursiveInputContainer">
                                            <label>Resposta Esperada:</label>
                                            <textarea onChange={(e) => setExpected_answer(e.target.value)} id="inputDiscursiveAnswer" defaultValue={question.expected_answer} type="text" />
                                        </div>
                                    </div>
                                :   

                                //-------------------OBJECTIVE-----------------------------------------

                                    <div className="objectiveAnswer">
                                        <div className="objectiveOptionsContainer">
                                            <div className="answerContainer">
                                                <label>Resposta 1</label>
                                                <input onChange={(e) => setAnswer1(e.target.value)} defaultValue={question.answer1} />
                                                <label>Resposta 2</label>
                                                <input onChange={(e) => setAnswer2(e.target.value)} defaultValue={question.answer2} />
                                            </div>
                                            <div className="answerContainer">
                                                <label>Resposta 3</label>
                                                <input onChange={(e) => setAnswer3(e.target.value)} defaultValue={question.answer3} />
                                                <label>Resposta 4</label>
                                                <input onChange={(e) => setAnswer4(e.target.value)} defaultValue={question.answer4} />
                                            </div>
                                        </div>
                                        <div className="rightAnswerContainer">
                                            <label>Resposta Correta</label>
                                            <input onChange={(e) => setRight_answer(e.target.value)} defaultValue={question.right_answer} />
                                        </div>
                                    </div>
                            }
                            <div className="btnEditQuestionSection">
                                <button onClick={() => handleDiscursiveEdit()} className="confirmQuestionEditBtn">Editar</button>
                                <button onClick={() => navigate(`/activities/management/edit/${question.id_activity}`)} className="cancelQuestionEditBtn">Cancelar</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}