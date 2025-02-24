import { useEffect, useState } from "react";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import { getAllStudents } from "../../services/StudentService";
import "./index.css"
import { IoIosSearch } from "react-icons/io";
import { LoadingIcon } from "../../components/LoadingIcon"
import { StudentListSection } from "../../components/StudentListSection";

export function SearchStudentPage(){

    const [students, setStudents] = useState([])
    const [emailToSearch, setEmailToSearch] = useState()
    
    function fetchStudents(){
        getAllStudents().then((students) => {
            setStudents(students)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    return(
        <div className="professorPageBody">
            <ProfessorDashBoard />
            <div className="searchContentSection">
                <h1>Pesquisa</h1>
                <div className="searchBarContainer">
                    <IoIosSearch className="searchIcon" />
                    <input type="text" placeholder="Pesquise por email..." className="searchBar" onChange={(e) => setEmailToSearch(e.target.value)} />
                </div>
                <div className="studentsListSection">
                    {
                        students.length == 0 ?
                            <LoadingIcon />
                        :
                            emailToSearch && <StudentListSection modalHandleAllocateStudent={() => null} students={students} emailToSearch={emailToSearch} />
                    }
                </div>
            </div>
        </div>
    )
}