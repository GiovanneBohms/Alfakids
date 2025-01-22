import { useEffect, useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import "./index.css"
import { ActivityCard } from "../../components/ActivityCard"
import { ClassroomCard } from "../../components/ClassroomCard"
import { getClassroomsByStudentId } from "../../services/ClassroomService"
import { getAccomplishedActivities, getActivitiesByClassroomId, getUnaccomplishedActivities } from "../../services/ActivityService"
import { useNavigate } from "react-router-dom"
import { LoadingIcon } from "../../components/LoadingIcon"
import { getCurrentStudentId } from "../../services/StudentService"
import { FaFolder } from "react-icons/fa"

export function ActivitiesPage(){
    const [activities, setActivities] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [isRepository, setIsRepository] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingActivities, setIsLoadingActivities] = useState(false)

    var activeClassrooms = document.querySelectorAll(".classroomCard")
    var repositoryCards = document.querySelectorAll(".repositoryCard")

    const navigate = useNavigate()

    const fetchClassrooms = async () => {
        getClassroomsByStudentId(getCurrentStudentId()).then((data) => {
            setClassrooms(data)
            setIsLoading(false)
        }).catch((error)=>{
            if(error.status == 404){
                setClassrooms(null)
                setIsLoading(false)
            }
        })
    }

    function fetchUnaccomplishedActivities(classroom){
        setIsLoadingActivities(true)
        setIsRepository(false)
        getUnaccomplishedActivities(classroom.id, getCurrentStudentId()).then((data) => {
            setActivities(data)
            setIsLoadingActivities(false)
        }).catch((error) => {
            if(error.status == 404){
                setActivities(null)
                setIsLoadingActivities(false)
            }
        })
    }

    function fetchAccomplishedActivities(){
        setIsLoadingActivities(true)
        setIsRepository(true)
        getAccomplishedActivities(getCurrentStudentId()).then((data) => {
            setActivities(data)
            setIsLoadingActivities(false)
        }).catch((error) => {
            if(error.status == 404){
                setActivities(null)
                setIsLoadingActivities(false)
            }
        })
    }

    function selectClassroomMenu(){
        activeClassrooms.forEach((item) => 
            item.classList.remove("active")
        )
        repositoryCards.forEach((item) =>
            item.classList.remove("active")
        )
        
        this.classList.add("active")
    }

    activeClassrooms.forEach((item) => 
        item.addEventListener('click', selectClassroomMenu)
    )

    repositoryCards.forEach((item) =>
        item.addEventListener('click', selectClassroomMenu)
    )

    useEffect(() => {
        fetchClassrooms()
    }, [])

    return (
        <div className="activitiesBody">
            <DashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="contentSection">
                        <div className="classroomsSection">
                            {
                                classrooms !== null ?
                                    classrooms.length !== 0 ?
                                        classrooms.map((classroom) => (
                                            <div key={classroom.id} onClick={() => fetchUnaccomplishedActivities(classroom)}>
                                                <ClassroomCard classroom={classroom} />
                                            </div>
                                        ))
                                    :
                                        <p className="notFoundMessage">Você não está em nenhuma turma...</p>
                                :
                                    <p className="notFoundMessage">Você não está em nenhuma turma...</p>
                            }
                        </div>
                        <div className="mainActivityTitleContainer">
                            <h1 className="mainActivityTitle">Atividades</h1>
                        </div>
                        {
                            isLoadingActivities ?
                                <div className="loadingActivitiesContainer">
                                    <LoadingIcon />
                                </div>
                            :
                                <section className="activitiesSection">
                                    {
                                        activities !== null ?
                                            !isRepository ?
                                                activities.map((activity) => (
                                                    <div key={activity.id} onClick={() => navigate(`/selected-activity/${activity.id}`)}>
                                                        <ActivityCard isRepository={isRepository} activity={activity} />
                                                    </div>
                                                ))
                                            :
                                                activities.map((activity) => (
                                                    <div key={activity.id}>
                                                        <ActivityCard isRepository={isRepository} activity={activity} />
                                                    </div>
                                                ))
                                        :
                                            <p className="notFoundMessage">Você não tem atividades pendentes nesta turma...</p>
                                    }
                                </section>
                        }
                        <div className="repositoryCard" onClick={() => fetchAccomplishedActivities()}>
                            <p><FaFolder /></p>
                            <p>Repositório</p>
                        </div>
                    </div>
            }
        </div>
    )
}