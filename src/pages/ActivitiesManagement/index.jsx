import { useEffect, useState } from "react";
import { LoadingIcon } from "../../components/LoadingIcon";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import { getActivitiesByProfessorId } from "../../services/ActivityService";
import "./index.css"
import { ActivityCard } from "../../components/ActivityCard";
import { useNavigate } from "react-router-dom";

export function ActivitiesManagement(){
    const [isLoading, setIsLoading] = useState(true)
    const [activities, setActivities] = useState([])

    const navigate = useNavigate()

    function fetchActivities(){
        try{
            getActivitiesByProfessorId(1).then((activities) => {
                setActivities(activities)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
        
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    return(
        <div className="activitiesManagementBody">
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="activitiesManagementSection">
                        <div>
                            <h1>Gerenciamento de Atividades</h1>
                        </div>
                        <div className="activitiesGrid">
                            {
                                activities.map((activity) => (
                                    <div key={activity.id} onClick={() => navigate(`/activities/management/edit/${activity.id}`)}>
                                        <ActivityCard activity={activity} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}