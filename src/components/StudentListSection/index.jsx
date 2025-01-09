import { useEffect, useState } from "react";
import { StudentCard } from "../StudentCard";
import "./index.css"
import { getAllStudents } from "../../services/StudentService";
import { LoadingIcon } from "../LoadingIcon";
import { allocateStudentInClassroom } from "../../services/ClassroomService";

export function StudentListSection({ modalHandleAllocateStudent, students, emailToSearch }){

    const [filteredStudents, setFilteredStudents] = useState([])

    

    function filterStudents(){
        if(emailToSearch !== null){
            let auxStudents = students.filter((student) => {
                if(student.email.toLowerCase().includes(emailToSearch)){
                    return true;
                }
                else{
                    return false;
                }
            });
            setFilteredStudents(auxStudents);
        } else{
            setFilteredStudents([]);
        }
    }

    useEffect(() => {
        filterStudents()
    }, [emailToSearch])

    return(
        <div className="studentListContainer">
            {
                filteredStudents.map((student) => (
                    <StudentCard modalHandleAllocateStudent={modalHandleAllocateStudent} student={student} />
                ))
            }
        </div>
    )
}