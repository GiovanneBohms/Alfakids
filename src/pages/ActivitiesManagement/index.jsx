import { useEffect, useState } from "react";
import { LoadingIcon } from "../../components/LoadingIcon";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import { deleteActivity, getActivitiesByProfessorId } from "../../services/ActivityService";
import "./index.css"
import "../../styles/TableStyles.css"
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import { ModalRemoveItems } from "../../components/ModalRemoveItems";
import { FaCodeFork } from "react-icons/fa6";
import { getCurrentProfessorId } from "../../services/ProfessorService";

export function ActivitiesManagement(){
    const [isLoading, setIsLoading] = useState(true)
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false)
    const [hasSelectedActivity, setHasSelectedActivity] = useState(false)
    const [activities, setActivities] = useState([])
    const [selectedActivities, setSelectedActivities] = useState([])

    const navigate = useNavigate()

    function fetchActivities(){
        try{
            getActivitiesByProfessorId(getCurrentProfessorId()).then((activities) => {
                setActivities(activities)
                setIsLoading(false)
            }).catch((error) => {
                if(error.status == 404){
                    setIsLoading(false)
                }
            })
        } catch(error){
            console.log(error.message)
        }   
    }

    function verifyInputChange(e, activity){
        if(e.target.checked){
            selectedActivities.push(activity.id)
            console.log(activity.id)
            setHasSelectedActivity(true)
        } else{
            const index = selectedActivities.indexOf(activity.id)
            selectedActivities.splice(index, 1)
            console.log("id removido: ", activity.id)
            if(selectedActivities.length == 0){
                setHasSelectedActivity(false)
            }
        }
    }

    function handleRemoveActivities(){
        for(let i = 0; i < selectedActivities.length; i++){
            deleteActivity(selectedActivities[i]).then(()=>{
                if(i == (selectedActivities.length - 1)){
                    location.reload()
                }
            }).catch((error)=>{
                console.log(error.message)
            })
        }
    }

    useEffect(() => {
        if(selectedActivities.length === 0){
            setHasSelectedActivity(false)
        } else{
            setHasSelectedActivity(true)
        }
    }, [selectedActivities])

    useEffect(() => {
        fetchActivities()
    }, [])

    return(
        <div className="activitiesManagementBody">
            {
                isModalRemoveOpen ?
                        <ModalRemoveItems elementsToRemove={selectedActivities} handleRemoveElements={handleRemoveActivities} setIsModalRemoveOpen={setIsModalRemoveOpen} />
                    :
                        null
            }
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="activitiesManagementSection">
                        <div><h1>Atividades</h1></div>
                        <div className="btnAddActivityContainer">
                            <button className="addButton" onClick={() => navigate("/activities/management/add")}><IoMdAdd /></button>
                            {
                                hasSelectedActivity ?
                                    <div className="selectedActivitiesOptions">
                                        <button className="trashButton" onClick={() => setIsModalRemoveOpen(true)}><IoMdTrash /></button>
                                        <button className="shareButtonDisabled"><FaCodeFork /></button>
                                    </div>
                                    
                                :
                                    <div className="selectedActivitiesOptions">
                                        <button className="trashButtonDisabled"><IoMdTrash /></button>
                                        <button className="shareButtonDisabled"><FaCodeFork /></button>
                                    </div>
                            }
                            
                        </div>
                        <table className="containerTable">
                            <tr className="headerRow">
                                <th className="edgeLeft">Title</th>
                                <th>Status</th>
                                <th>Subject</th>
                                <th className="edgeRight"></th>
                            </tr>
                            {
                                activities.map((activity, index) => (
                                    <tr key={index} className="infoRow">
                                        <td onClick={() => navigate(`/activities/management/edit/${activity.id}`)}>{activity.title}</td>
                                        <td onClick={() => navigate(`/activities/management/edit/${activity.id}`)}>{activity.status}</td>
                                        <td onClick={() => navigate(`/activities/management/edit/${activity.id}`)}>{activity.id_subject}</td>
                                        <div className="sectionSelect">
                                            <label className="containerSelect">
                                                <input type="checkbox" value={activity.id} onChange={(e) => verifyInputChange(e, activity)} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
            }
        </div>
    )
}