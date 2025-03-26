import { useEffect, useState } from "react";
import "./index.css"
import { IoIosSearch } from "react-icons/io";
import { StudentListSection } from "../StudentListSection";
import { filterStudentsByEmail, getAllStudents } from "../../services/StudentService";
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
        setIsLoading(true)
        filterStudentsByEmail(emailToSearch).then((students) => {
            setStudents(students)
            setIsLoading(false)
        }).catch((error) => {
            if(error.status === 404){
                setStudents([])
                setIsLoading(false)
            }
            console.log(error.message)
        })
    }

    useEffect(() => {
        if(emailToSearch !== null){
            fetchStudents()
        }
        else{
            setIsLoading(false)
        }
    }, [emailToSearch])

    /*---------------------------------Atribuir ao backend a filtragem (futuramente) ---------------------------------------*/

    return(
        <div className="modalBg">
            <div className="modalAddStudentMainSection">
                <div className="mainContentContainer">
                    <p className="mainTitle">Adicione alunos à essa turma</p>
                    <p className="mainTitle">Procure por email</p>
                    <div className="inputContainer">
                        <IoIosSearch className="searchIcon" />
                        <input type="text" placeholder="Procurar alunos" onChange={(e) => setEmailToSearch(e.target.value)} />
                    </div>
                </div>
                {
                    emailToSearch && <StudentListSection modalHandleAllocateStudent={modalHandleAllocateStudent} students={students} isLoading={isLoading} />
                }
                <button className="cancelButton" onClick={() => setIsModalAddStudentOpen(false)}>Fechar</button>
            </div>
        </div>
    )
}