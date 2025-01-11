/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import "./index.css"
import "../../styles/TableStyles.css"
import { deleteClassroom, getClassroomsByProfessorId } from "../../services/ClassroomService";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../../components/LoadingIcon";
import { IoMdTrash } from "react-icons/io";
import { ModalRemoveItems } from "../../components/ModalRemoveItems";
import { getCurrentProfessorId } from "../../services/ProfessorService";

export function ClassroomManagement(){

    const [classrooms, setClassrooms] = useState([])
    const [selectedClassrooms, setSelectedClassrooms] = useState([])
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [hasSelectedClassroom, setHasSelectedClassroom] = useState(false)

    const navigate = useNavigate()

    function verifyInputChange(e, classroom){
        if(e.target.checked){
            selectedClassrooms.push(classroom.id)
            console.log(classroom.id)
            setHasSelectedClassroom(true)
        } else{
            const index = selectedClassrooms.indexOf(classroom.id)
            selectedClassrooms.splice(index, 1)
            console.log("id removido: ", classroom.id)
            if(selectedClassrooms.length == 0){
                setHasSelectedClassroom(false)
            }
        }
    }

    const fetchClassrooms = async () => {
            try{
                getClassroomsByProfessorId(getCurrentProfessorId()).then((data) => {
                    setClassrooms(data)
                    setIsLoading(false)
                }).catch((error)=>{
                    if(error.status == 404){
                        setIsLoading(false)
                    }
                })
            }
            catch(error){
                console.log(error)
            }
        }

    function handleRemoveClassroom(){
        for(let i = 0; i < selectedClassrooms.length; i++){
            deleteClassroom(selectedClassrooms[i]).then(()=>{
                if(i == (selectedClassrooms.length - 1)){
                    location.reload()
                }
            }).catch((error)=>{
                console.log(error.message)
            })
        }
    }

    useEffect(() => {
        fetchClassrooms()
    }, [])

    return(
        <div className="classroomManagementBody">
            {
                isModalRemoveOpen ?
                    <ModalRemoveItems handleRemoveElements={handleRemoveClassroom} elementsToRemove={selectedClassrooms} setIsModalRemoveOpen={setIsModalRemoveOpen} />
                :
                    null
            }
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="classroomManagementSection">
                        <div><h1>Turmas</h1></div>
                        <div className="btnAddClassroomContainer">
                            <button className="addButton" onClick={() => navigate("/classroom/management/add")}><IoMdAdd /></button>
                            {
                                hasSelectedClassroom ?
                                    <button className="trashButton" onClick={() => setIsModalRemoveOpen(true)}><IoMdTrash /></button>
                                :
                                    <button className="trashButtonDisabled"><IoMdTrash /></button>
                            }
                        </div>
                        <table className="containerTable">
                            <tr className="headerRow">
                                <th className="edgeLeft">Number</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th className="edgeRight"></th>
                            </tr>
                            {
                                classrooms.map((classroom, index) => (
                                    <tr key={index} className="infoRow">
                                        <td onClick={() => navigate(`/classroom/management/edit/${classroom.id}`)}>{classroom.number}</td>
                                        <td onClick={() => navigate(`/classroom/management/edit/${classroom.id}`)}>{classroom.year}</td>
                                        <td onClick={() => navigate(`/classroom/management/edit/${classroom.id}`)}>{classroom.status}</td>
                                        <div className="sectionSelect">
                                            <label className="containerSelect">
                                                <input type="checkbox" value={classroom.id} onChange={(e) => verifyInputChange(e, classroom)} />
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