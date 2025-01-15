import { Navigate, useParams } from "react-router-dom";
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard";
import "./index.css"
import "../../styles/TableStyles.css"
import { useEffect, useState } from "react";
import { allocateStudentInClassroom, deleteStudentFromClassroom, getClassroomById } from "../../services/ClassroomService";
import { getAllStudents, getStudentsByClassroomId } from "../../services/StudentService";
import { LoadingIcon } from "../../components/LoadingIcon";
import { ModalAddStudent } from "../../components/ModalAddStudent";
import { IoMdTrash } from "react-icons/io";
import { ModalRemoveItems } from "../../components/ModalRemoveItems";
import { ModalChangeClassroomVisibility } from "../../components/ModalChangeClassroomVisibility";

export function EditClassroomPage(){
    const {id_classroom} = useParams()

    const [classroom, setClassroom] = useState()

    const [studentsOutOfClassroom, setStudentsOutOfClassroom] = useState([])
    const [studentsInClassroom, setStudentsInClassroom] = useState([])
    const [selectedStudents, setSelectedStudents] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [hasSelectedStudents, setHasSelectedStudents] = useState(false)

    const [isModalAddStudentOpen, setIsModalAddStudentOpen] = useState(false)
    const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false)
    const [isModalChangeVisibilityOpen, setIsModalChangeVisibilityOpen] = useState(false)

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

    function verifyInputChange(e, student){
        if(e.target.checked){
            selectedStudents.push(student.id)
            console.log(student.id)
            setHasSelectedStudents(true)
        } else{
            const index = selectedStudents.indexOf(student.id)
            selectedStudents.splice(index, 1)
            console.log("id removido: ", student.id)
            if(selectedStudents.length == 0){
                setHasSelectedStudents(false)
            }
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

    function handleRemoveStudentsFromClassroom(){
        console.log(selectedStudents)
        for(let i = 0; i < selectedStudents.length; i++){
            deleteStudentFromClassroom(id_classroom, selectedStudents[i]).then(()=>{
                if(i == (selectedStudents.length - 1)){
                    location.reload()
                }
            }).catch((error)=>{
                console.log(error.message)
            })
        }
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
                isModalRemoveOpen ?
                    <ModalRemoveItems elementsToRemove={selectedStudents} handleRemoveElements={handleRemoveStudentsFromClassroom} setIsModalRemoveOpen={setIsModalRemoveOpen} />
                :
                    null
            }
            {
                isModalAddStudentOpen ?
                    <ModalAddStudent handleAllocateStudent={handleAllocateStudent} setIsModalAddStudentOpen={setIsModalAddStudentOpen} />
                :
                    null
            }
            <ProfessorDashBoard />
            {
                isLoading ?
                    <div className="loadingContainer">
                        <LoadingIcon />
                    </div>
                :
                    <section className="editClassroomPageSection">
                        <div className="editClassroomForm">
                            <p className="editClassroomTitle">Gerenciamento de Turma</p>
                            <div className="editClassroomInput">
                                <label>Número:</label>
                                <input type="text" disabled value={classroom.number} />
                            </div>
                            <div className="editClassroomInput">
                                <label>Ano:</label>
                                <input type="text" disabled value={classroom.year} />
                            </div>
                            <div className="studentsInClassroomTable">
                                <div className="studentTableTitleSection">
                                    <div>
                                        <p>Alunos da Turma:</p>
                                    </div>
                                    <div className="studentsOptionsSection">
                                        {
                                            classroom.status !== "INITIALIZED" ?
                                                <button className="addButtonDisabled">Adicionar alunos</button>
                                            :
                                                <button className="addButton" onClick={() => setIsModalAddStudentOpen(true)}>Adicionar alunos</button>
                                        }
                                        
                                        {
                                            hasSelectedStudents ?
                                                <button className="trashButton" onClick={() => setIsModalRemoveOpen(true)}><IoMdTrash /></button>
                                            :
                                                <button className="trashButtonDisabled"><IoMdTrash /></button>
                                        }
                                    </div>
                                </div>
                                <table className="containerTable">
                                    <tbody>
                                        <tr className="headerRow">
                                            <th className="edgeLeft">Nome</th>
                                            <th>Email</th>
                                            <th>Idade</th>
                                            <th>Gênero</th>
                                            <th>Nível de Autismo</th>
                                            <th>Ano Escolar</th>
                                            <th className="edgeRight"></th>
                                        </tr>
                                        {
                                            studentsInClassroom.map((student, index) => (
                                                <tr key={index} className="infoRow">
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.age}</td>
                                                    <td>{student.gender}</td>
                                                    <td>{student.autism_level}</td>
                                                    <td>{student.school_year}</td>
                                                    <div className="sectionSelect">
                                                        <label className="containerSelect">
                                                            <input type="checkbox" value={student.id} onChange={(e) => verifyInputChange(e, student)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="dangerZone">
                                <p id="titleDangerZone">Opções</p>
                                <div className="mainContentDangerZone">
                                    <ul className="menuList">
                                        <li>
                                            <div className="menuItemContainer">
                                                <div className="labelContainer">
                                                    <strong>Alterar status da turma</strong>
                                                    <p>Esta turma está com status {classroom.status} no momento.</p>
                                                </div>
                                                <div className="changeStatusButtonContainer">
                                                    <button className="changeStatusButton" onClick={() => setIsModalChangeVisibilityOpen(!isModalChangeVisibilityOpen)}>Alterar Status</button>
                                                    {
                                                        isModalChangeVisibilityOpen ?
                                                            <div className="modalChangeVisibilitySection">
                                                                <ModalChangeClassroomVisibility classroom={classroom} />
                                                            </div>
                                                        :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
            }
        </div>
    )
}