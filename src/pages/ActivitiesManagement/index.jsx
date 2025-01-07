import { useEffect, useState } from "react";
import { LoadingIcon } from "../../components/LoadingIcon";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import { getActivitiesByProfessorId } from "../../services/ActivityService";
import "./index.css"
import "../../styles/TableStyles.css"
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

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
                        <div><h1>Atividades</h1></div>
                        <div className="btnAddContainer">
                            <button onClick={() => navigate("/activities/management/add")}><IoMdAdd /></button>
                        </div>
                        <table className="containerTable">
                            <tr className="headerRow">
                                <th className="edgeLeft">Title</th>
                                <th>Status</th>
                                <th className="edgeRight">Subject</th>
                            </tr>
                            {
                                activities.map((activity, index) => (
                                    <tr key={index} className="infoRow" onClick={() => navigate(`/activities/management/edit/${activity.id}`)}>
                                        <td>{activity.title}</td>
                                        <td>{activity.status}</td>
                                        <td>{activity.id_subject}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
            }
        </div>
    )
}