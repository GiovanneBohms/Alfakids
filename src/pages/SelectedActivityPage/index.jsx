import "./index.css"
import { DashBoard } from "../../components/DashBoard"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getActivityById } from "../../services/ActivityService"
import { getQuestionsByActivityId } from "../../services/QuestionService"
import { QuestionForm } from "../../components/QuestionForm"
import { LoadingIcon } from "../../components/LoadingIcon"
import { ModalAccomplishConfirm } from "../../components/ModalAccomplishConfirm"

export function SelectedActivityPage(){

    const { id_activity } = useParams()

    const [activity, setActivity] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const [isModalAccomplishOpen, setIsModalAccomplishOpen] = useState(false)

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

    function confirmAccomplish(){
        setIsLoading(false)
        setIsModalAccomplishOpen(true)

        setTimeout(() => {
            navigate("/activities")
        }, 2000)
    }

    useEffect(() => {
        fetchActivity()
        fetchQuestions()
    }, [])

    return(
        <div className="selectedActivityPage">
            <DashBoard />
            {
                isLoading || activity == null ?
                    <LoadingIcon />
                :
                    isModalAccomplishOpen ?
                        <div className="modalAccomplishContainer">
                            <ModalAccomplishConfirm />
                        </div>
                    :
                        <div className="questionsSection">
                            <h1>{activity.title}</h1>
                            <QuestionForm isLoading={isLoading} setIsLoading={setIsLoading} questions={questions} id_activity={id_activity} confirmAccomplish={confirmAccomplish} />
                        </div>
            }
        </div>
    )
}