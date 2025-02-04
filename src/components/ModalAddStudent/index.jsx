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
                    <p className="mainTitle">Adicione alunos à essa turma</p>
                    <p className="mainTitle">Procure por email</p>
                    <div className="inputContainer">
                        <IoIosSearch className="searchIcon" />
                        <input type="text" placeholder="Procurar alunos" onChange={(e) => setEmailToSearch(e.target.value)} />
                    </div>
                </div>
                {
                    isLoading ?
                        <LoadingIcon />
                    :
                        emailToSearch && <StudentListSection modalHandleAllocateStudent={modalHandleAllocateStudent} students={students} emailToSearch={emailToSearch} />
                }
                <button className="cancelButton" onClick={() => setIsModalAddStudentOpen(false)}>Fechar</button>
            </div>
        </div>
    )
}