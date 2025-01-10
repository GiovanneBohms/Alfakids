import { useEffect, useState } from "react";
import "./index.css"
import { IoIosSearch } from "react-icons/io";
import { StudentListSection } from "../StudentListSection";
import { getAllStudents } from "../../services/StudentService";
import { LoadingIcon } from "../LoadingIcon";

export function ModalAddStudent({ setIsModalAddStudentOpen, handleAllocateStudent }){

    const [emailToSearch, setEmailToSearch] = useState(null)
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function modalHandleAllocateStudent(student){
        handleAllocateStudent(student)
        setIsModalAddStudentOpen(false)
    }

    function fetchStudents(){
        getAllStudents().then((students) => {
            setStudents(students)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    /*---------------------------------Atribuir ao backend a filtragem (futuramente) ---------------------------------------*/

    return(
        <div className="modalAddStudentBackground">
            <div className="modalMainSection">
                <div className="mainContentContainer">
                    <p className="mainTitle">Add students to this classroom</p>
                    <p className="mainTitle">Search by email</p>
                    <div className="inputContainer">
                        <IoIosSearch className="searchIcon" />
                        <input type="text" placeholder="Find students" onChange={(e) => setEmailToSearch(e.target.value)} />
                    </div>
                </div>
                {
                    isLoading ?
                        <LoadingIcon />
                    :
                        emailToSearch ?
                            <StudentListSection modalHandleAllocateStudent={modalHandleAllocateStudent} students={students} emailToSearch={emailToSearch} />
                        :
                            null
                }
                <button className="cancelButton" onClick={() => setIsModalAddStudentOpen(false)}>Fechar</button>
            </div>
        </div>
    )
}