import "./index.css"
import { DashBoard } from "../../components/DashBoard"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getActivityById } from "../../services/ActivityService"
import { getQuestionsByActivityId } from "../../services/QuestionService"
import { QuestionForm } from "../../components/QuestionForm"
import { LoadingIcon } from "../../components/LoadingIcon"

export function SelectedActivityPage(){

    const { id_activity } = useParams()

    const [activity, setActivity] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])

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
        <div className="selectedActivityPage">
            <DashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="questionsSection">
                        <h1>{activity.title}</h1>
                        {questions.map((question, index) => (
                            <QuestionForm key={index} question={question} />
                        ))}
                    </div>
            }
        </div>
    )
}