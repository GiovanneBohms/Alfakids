import { useEffect, useState } from "react"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import "./index.css"
import "../../styles/TableStyles.css"
import { LoadingIcon } from "../../components/LoadingIcon"
import { EditQuestionForm } from "../../components/EditQuestionForm"
import { useNavigate, useParams } from "react-router-dom"
import { getActivityById } from "../../services/ActivityService"
import { getQuestionsByActivityId } from "../../services/QuestionService"
import { IoMdAdd } from "react-icons/io";
import { FaCodeFork } from "react-icons/fa6";
import { ModalDistributeActivity } from "../../components/ModalDistributeActivity"
import { getCurrentProfessorId } from "../../services/ProfessorService"
import { getAllStudentsByActivityId } from "../../services/AccomplishmentsService"

export function EditActivityPage(){
    const { id_activity } = useParams()

    const [activity, setActivity] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const [students, setStudents] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    function fetchActivity(){
        try{
            getActivityById(id_activity).then((data_activity) => {
                setActivity(data_activity)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error.message)
        }
    }

    function fetchStudents(){
        try{
            getAllStudentsByActivityId(id_activity).then((students) => {
                setStudents(students)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    function fetchQuestions(){
        try{
            getQuestionsByActivityId(id_activity).then((data) => {
                setQuestions(data)
                setIsLoading(false)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchStudents()
        fetchActivity()
        fetchQuestions()
    }, [])

    return(
        <div className="editActivityBody">
            {
                isModalOpen ?
                        <ModalDistributeActivity idActivity={id_activity} idProfessor={getCurrentProfessorId()} setIsModalOpen={setIsModalOpen} />
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
                    <div className="questionsSection">
                        
                            {
                                students.length !== 0 ?
                                    <div className="studentsAccomplishmentsSection">
                                        <table className="containerTable">
                                            <tr className="headerRow">
                                                <th className="edgeLeft">Nome</th>
                                                <th>Email</th>
                                                <th>Ano Escolar</th>
                                                <th className="edgeRight">Nível de Autismo</th>
                                            </tr>
                                            {
                                                students.map((student, index) => (
                                                    <tr key={index} className="infoRow" onClick={() => navigate(`/accomplishment/${id_activity}/${student.id}`)}>
                                                        <td>{student.name}</td>
                                                        <td>{student.email}</td>
                                                        <td>{student.school_year}</td>
                                                        <td>{student.autism_level}</td>
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    </div>
                                :
                                    <p>Sem envios</p>
                            }
                            
                        
                        <h1>{activity.title}</h1>
                        <div className="btnQuestionOptionsContainer">
                            <button className="addButton" onClick={() => navigate(`/activities/management/edit/question/add/${activity.id}`)}><IoMdAdd /></button>
                            <button className="shareButton" onClick={() => setIsModalOpen(true)}><FaCodeFork /></button>
                        </div>
                        {questions.map((question, index) => (
                            <EditQuestionForm key={index} question={question} />
                        ))}
                    </div>
            }
        </div>
    )
}