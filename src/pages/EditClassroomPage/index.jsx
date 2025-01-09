import { Navigate, useParams } from "react-router-dom";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import "./index.css"
import { useEffect, useState } from "react";
import { allocateStudentInClassroom, getClassroomById } from "../../services/ClassroomService";
import { getAllStudents, getStudentsByClassroomId } from "../../services/StudentService";
import { LoadingIcon } from "../../components/LoadingIcon";
import { ModalAddStudent } from "../../components/ModalAddStudent";

export function EditClassroomPage(){
    const {id_classroom} = useParams()

    const [classroom, setClassroom] = useState()
    const [studentsOutOfClassroom, setStudentsOutOfClassroom] = useState([])
    const [studentsInClassroom, setStudentsInClassroom] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalAddStudentOpen, setIsModalAddStudentOpen] = useState(false)

    function fetchClassroom(){
        try{
            getClassroomById(id_classroom).then((classroom) => {
                setClassroom(classroom)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    function fetchStudents(){
        try{
            getAllStudents().then((students) => {
                getStudentsByClassroomId(id_classroom).then((classroomStudents) => {
                    if(classroomStudents != []){
                        let filteredStudentsList = []
                        students.forEach(student => {
                            if(!classroomStudents.some(studentInClassroom => studentInClassroom.id == student.id)){

                                filteredStudentsList.push(student)
                            }
                        })

                        setStudentsOutOfClassroom(filteredStudentsList)
                    } else{
                        setStudentsOutOfClassroom(students)
                    }
                }).catch((error) => {
                    console.log(error.message)
                })
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    function handleAllocateStudent(student){
        setIsLoading(true)
        allocateStudentInClassroom(classroom.id, student.id).then(() => {
            setStudentsInClassroom([...studentsInClassroom, student])
            setStudentsOutOfClassroom(studentsOutOfClassroom.filter(studentInList => studentInList.id !== student.id))
            setIsLoading(false)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    function fetchStudentsInClassroom(){
        try{
            getStudentsByClassroomId(id_classroom).then((classroomStudents) => {
                setStudentsInClassroom(classroomStudents)
                setIsLoading(false)
                
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    /*function handleDeleteAllocation(student){
        allocateStudentInClassroom(classroom.id, student.id).then(() => {
            setStudentsInClassroom([...studentsInClassroom, student])
            setFilteredStudents(filteredStudents.filter(studentInList => studentInList.id !== student.id))
        }).catch((error) => {
            console.log(error.message)
        })
    }*/
    

    useEffect(() => {
        fetchClassroom()
        fetchStudents()
        fetchStudentsInClassroom()
    }, [])

    return(
        <div className="editClassroomPageBody">
            {
                isModalAddStudentOpen ?
                    <ModalAddStudent handleAllocateStudent={handleAllocateStudent} setIsModalAddStudentOpen={setIsModalAddStudentOpen} />
                :
                    null
            }
            <ProfessorDashBoard />
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <section className="editClassroomPageSection">
                        <div className="editClassroomForm">
                            <h1 className="editClassroomTitle">Gerenciamento de Turma</h1>
                            <div className="editClassroomInput">
                                <label>Number:</label>
                                <input type="text" disabled value={classroom.number} />
                            </div>
                            <div className="editClassroomInput">
                                <label>Year:</label>
                                <input type="text" disabled value={classroom.year} />
                            </div>
                            <div className="studentsInClassroomTable">
                                <div className="studentTableTitleSection">
                                    <div>
                                        <h1>Aluno da Turma:</h1>
                                    </div>
                                    <div className="addStudentsButton">
                                        <button onClick={() => setIsModalAddStudentOpen(true)}>Add students</button>
                                    </div>
                                </div>
                                <table className="studentTable">
                                    <tbody>
                                        <tr className="studentHeaderRow">
                                            <th className="studentEdgeLeft">Name</th>
                                            <th>Email</th>
                                            <th>Age</th>
                                            <th>Gender</th>
                                            <th>Autism Level</th>
                                            <th className="studentEdgeRight">School Year</th>
                                        </tr>
                                        {
                                            studentsInClassroom.map((student, index) => (
                                                <tr key={index} className="studentInfoRow">
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.age}</td>
                                                    <td>{student.gender}</td>
                                                    <td>{student.autism_level}</td>
                                                    <td>{student.school_year}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
            }
        </div>
    )
}