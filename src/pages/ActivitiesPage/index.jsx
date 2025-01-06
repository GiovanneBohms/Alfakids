import { useEffect, useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import "./index.css"
import { ActivityCard } from "../../components/ActivityCard"
import { ClassroomCard } from "../../components/ClassroomCard"
import { getClassroomsByStudentId } from "../../services/ClassroomService"
import { getActivitiesByClassroomId } from "../../services/ActivityService"
import { useNavigate } from "react-router-dom"
import { LoadingIcon } from "../../components/LoadingIcon"
import { getCurrentStudentId } from "../../services/StudentService"

export function ActivitiesPage(){
    const [activities, setActivities] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [selectedClassroom, setSelectedClassroom] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    //const authentication = useContext(AuthContext)

    const navigate = useNavigate()

    const fetchClassrooms = async () => {
        try{
            getClassroomsByStudentId(getCurrentStudentId()).then((data) => {
                setClassrooms(data)
                setIsLoading(false)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const fetchActivities = async () => {
        try{
            getActivitiesByClassroomId(selectedClassroom.id).then((data) => {
                setActivities(data)
            }).catch((error) => {
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error)
        }
    }
    

    useEffect(() => {
        fetchActivities()
    }, [selectedClassroom])

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
                            {classrooms.map((classroom) => (
                                <div key={classroom.id} onClick={() => setSelectedClassroom(classroom)}>
                                    <ClassroomCard classroom={classroom} />
                                </div>
                            ))}
                        </div>
                        <div>
                            <h1>Atividades</h1>
                        </div>
                        <section className="activitiesSection">
                            {activities.map((activity) => (
                                <div key={activity.id} onClick={() => navigate(`/selected-activity/${activity.id}`)}>
                                    <ActivityCard activity={activity} />
                                </div>
                            ))}
                        </section>
                    </div>
            }
            
        </div>
    )
}