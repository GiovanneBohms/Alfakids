import React, { useEffect, useState } from 'react'
import './index.css'
import "../../styles/CreateButtonSectionStyles.css"
import { useNavigate } from 'react-router-dom'
import { ProfessorDashBoard } from '../../components/ProfessorDashBoard'
import { findAllSubjects } from '../../services/SubjectService'
import { LoadingIcon } from '../../components/LoadingIcon'
import { initializeActivity } from '../../services/ActivityService'
import { getCurrentProfessorId } from '../../services/ProfessorService'

export function AddActivityPage(){

    const navigate = useNavigate()

    const [subjects, setSubjects] = useState([])
    const [title, setTitle] = useState()
    const [idSubject, setIdSubject] = useState()
    const [idProfessor, setIdProfessor] = useState(getCurrentProfessorId())
    const [isLoading, setIsLoading] = useState(true)

    function fetchSubjects(){
        findAllSubjects().then((subjects) => {
            setSubjects(subjects)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error.message)
        })
    }

    function handleAddActivity(){
        console.log(idSubject)
        initializeActivity(title, idSubject, idProfessor).then(()=>{
            navigate("/activities/management")
        }).catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        fetchSubjects()
    }, [])

    return (
        <div className="addActivityPageBody">
            <ProfessorDashBoard />
            {
                isLoading ? 
                    <LoadingIcon />
                :
                    <section className="addActivitySection">
                        <div>
                            <h1>Adicionar Atividade</h1>
                        </div>
                        <div className="addActivityForm">
                            <div className="addActivityInput">
                                <label>Título:</label>
                                <input onChange={(e) => setTitle(e.target.value)} type="text" />
                            </div>
                            <div className="addActivityInput">
                                <label>Matéria:</label>
                                <select onChange={(e) => setIdSubject(e.target.value)} className="addActivitySelect">
                                    <option value="">Selecione uma matéria...</option>
                                    {
                                        subjects.map((subject, index) => (
                                            <option key={index} value={subject.id}>{subject.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="createBtnSection">
                                <button className="addCreationButton" onClick={() => handleAddActivity()}>Adicionar</button>
                                <button className="cancelCreationButton" onClick={() => navigate("/activities/management")}>Cancelar</button>
                            </div>
                        </div>
                    </section>
            }
        </div>
    )
}
