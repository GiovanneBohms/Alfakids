import { useState } from "react"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import { initializeClassroom } from "../../services/ClassroomService"
import "./index.css"
import { useNavigate } from "react-router-dom"

export function AddClassroomPage(){

    const [number, setNumber] = useState()
    const [year, setYear] = useState()
    const idProfessor = 1

    const navigate = useNavigate()

    function handleInitializeClassroom(){
        try{
            initializeClassroom(number, year, idProfessor).then(() => {
                navigate("/classroom/management")
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
        
    }

    return(
        <div className="addClassroomPageBody">
            <ProfessorDashBoard />
            <section className="addClassroomSection">
                <div>
                    <h1>Add Classroom</h1>
                </div>
                <div className="addClassroomForm">
                    <div className="addClassroomInput">
                        <label>Number:</label>
                        <input onChange={(e) => setNumber(e.target.value)} type="text" />
                    </div>
                    <div className="addClassroomInput">
                        <label>Year:</label>
                        <input onChange={(e) => setYear(e.target.value)} type="text" />
                    </div>
                    <div className="createBtnSection">
                        <button onClick={() => handleInitializeClassroom()}>Add</button>
                        <button onClick={() => navigate("/classroom/management")}>Cancel</button>
                    </div>
                </div>
            </section>
        </div>
    )
}