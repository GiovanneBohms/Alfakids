import { useEffect, useState } from "react";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import "./index.css"
import { getClassroomsByProfessorId } from "../../services/ClassroomService";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../../components/LoadingIcon";

export function ClassroomManagement(){

    const [classrooms, setClassrooms] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const fetchClassrooms = async () => {
            try{
                getClassroomsByProfessorId(1).then((data) => {
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

    useEffect(() => {
        fetchClassrooms()
    }, [])

    return(
        <div className="classroomManagementBody">
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="classroomManagementSection">
                        <div><h1>Turmas</h1></div>
                        <div className="btnAddContainer">
                            <button onClick={() => navigate("/classroom/management/add")}><IoMdAdd /></button>
                        </div>
                        <table className="classroomTable">
                            <tr className="headerRow">
                                <th className="edgeLeft">Number</th>
                                <th>Year</th>
                                <th className="edgeRight">Status</th>
                            </tr>
                            {
                                classrooms.map((classroom) => (
                                    <tr className="infoRow" onClick={() => navigate(`/classroom/management/edit/${classroom.id}`)}>
                                        <td>{classroom.number}</td>
                                        <td>{classroom.year}</td>
                                        <td>{classroom.status}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
            }
            
        </div>
    )
}