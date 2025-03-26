import { useEffect, useState } from "react";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import { filterStudentsByEmail, getAllStudents } from "../../services/StudentService";
import "./index.css"
import { IoIosSearch } from "react-icons/io";
import { LoadingIcon } from "../../components/LoadingIcon"
import { StudentListSection } from "../../components/StudentListSection";
import { useNavigate } from "react-router-dom";
import { ModalInfoStudent } from "../../components/ModalInfoStudent";
import { getAccountablesByStudentId } from "../../services/AccountableService";

export function SearchStudentPage(){

    const [students, setStudents] = useState([])
    const [selectedStudent, setSelectedStudent] = useState()
    const [emailToSearch, setEmailToSearch] = useState()
    const [isModalStudent, setIsModalStudent] = useState(false)
    const [accountables, setAccountables] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    
    function fetchStudents(){
        setIsLoading(true)
        filterStudentsByEmail(emailToSearch).then((students) => {
            setStudents(students)
            setIsLoading(false)
        }).catch((error) => {
            if(error.status){
                setStudents([])
                setIsLoading(false)
            }
            console.log(error.message)
        })
    }

    function fetchAccountables(student){
        getAccountablesByStudentId(student.id).then((accountables) => {
            setAccountables(accountables)
            setIsModalStudent(true)
        }).catch((error) => {
            if(error.status == 404){
                setAccountables([])
                setIsModalStudent(true)
            }
            console.log(error.message)
        })
    }

    function handleStudentSelection(student){
        setSelectedStudent(student)
        fetchAccountables(student)
    }

    useEffect(() => {
        fetchStudents()
    }, [emailToSearch])

    return(
        <div className="professorPageBody">
            {
                isModalStudent ?
                    <ModalInfoStudent student={selectedStudent} accountables={accountables} setModalOpen={setIsModalStudent} />
                :
                    null
            }
            <ProfessorDashBoard />
            <div className="searchContentSection">
                <h1>Pesquisa</h1>
                <div className="searchBarContainer">
                    <IoIosSearch className="searchIcon" />
                    <input type="text" placeholder="Pesquise por email..." className="searchBar" onChange={(e) => setEmailToSearch(e.target.value)} />
                </div>
                <div className="studentsListSection">
                    {
                        emailToSearch && <StudentListSection modalHandleAllocateStudent={handleStudentSelection} students={students} isLoading={isLoading} />
                    }
                </div>
            </div>
        </div>
    )
}