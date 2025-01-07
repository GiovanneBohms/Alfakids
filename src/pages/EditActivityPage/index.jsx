import { useEffect, useState } from "react"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import "./index.css"
import { LoadingIcon } from "../../components/LoadingIcon"
import { EditQuestionForm } from "../../components/EditQuestionForm"
import { useNavigate, useParams } from "react-router-dom"
import { getActivityById } from "../../services/ActivityService"
import { getQuestionsByActivityId } from "../../services/QuestionService"
import { IoMdAdd } from "react-icons/io";
import { FaCodeFork } from "react-icons/fa6";

export function EditActivityPage(){
    const { id_activity } = useParams()

    const [activity, setActivity] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()

    function fetchActivity(){
        try{
            getActivityById(id_activity).then((data_activity) => {
                setActivity(data_activity)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error.message)
        }
    }

    function fetchQuestions(){
        try{
            getQuestionsByActivityId(id_activity).then((data) => {
                setQuestions(data)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
        
    }

    useEffect(() => {
        fetchActivity()
        fetchQuestions()
    }, [])

    return(
        <div className="editActivityBody">
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="questionsSection">
                        <h1>{activity.title}</h1>
                        <div className="btnAddContainer">
                            <button onClick={() => navigate(`/activities/management/edit/question/add/${activity.id}`)}><IoMdAdd /></button>
                            <button><FaCodeFork /></button>
                        </div>
                        {questions.map((question, index) => (
                            <EditQuestionForm key={index} question={question} />
                        ))}
                    </div>
            }
        </div>
    )
}