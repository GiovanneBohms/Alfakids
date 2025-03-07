import { useEffect, useState } from "react"
import "./index.css"
import { LoadingIcon } from "../LoadingIcon"
import { getClassroomsByActivityId, getClassroomsByProfessorId, getClassroomsToDistribute } from "../../services/ClassroomService"
import { distributeActivity } from "../../services/ActivityService"

export function ModalDistributeActivity({ idActivity ,idProfessor, setIsModalOpen }){

    const [isLoading, setIsLoading] = useState(true)
    const [classrooms, setClassrooms] = useState([])

    const [selectedClassrooms, setSelectedClassrooms] = useState([])


    function fetchClassrooms(){
        getClassroomsToDistribute(idActivity, idProfessor).then((classrooms) => {
            setClassrooms(classrooms)
            setIsLoading(false)
        }).catch((error) => {
            if(error.status == 404){
                setClassrooms(null)
                setIsLoading(false)
            }
            console.log(error.message)
        })
    }

    function verifyInputChange(e, classroom){
        if(e.target.checked){
            selectedClassrooms.push(classroom.id)
            console.log(classroom.id)
        } else{
            const index = selectedClassrooms.indexOf(classroom.id)
            selectedClassrooms.splice(index, 1)
            console.log("id removido: ", classroom.id)
        }
    }

    function handleShareActivity(){
        setIsLoading(true)
        if(selectedClassrooms.length > 0){
            for(let i = 0; i < selectedClassrooms.length; i++){
                distributeActivity(selectedClassrooms[i], idActivity).then(()=>{
                    if(i == (selectedClassrooms.length - 1)){
                        setIsModalOpen(false)
                    }
                }).catch((error)=>{
                    console.log(error.message)
                })
            }
        } else{
            setIsLoading(false)
            alert("Classrooms not selected!")
        }
    }

    useEffect(() => {
        fetchClassrooms()
    }, [])

    return(
        <div className="modalBg">
            <div className="modalFormSection">
                <h1>Compartilhar</h1>
                {
                    isLoading ?
                        <LoadingIcon />
                    :
                        <form className="modalFormContainer">
                            {
                                classrooms != null ?
                                    classrooms.map((classroom, index) => (
                                        <div key={index} className="classroomCheckbox">
                                            <label className="container">{classroom.number}
                                                <input type="checkbox" value={classroom.id} onChange={(e) => verifyInputChange(e, classroom)} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    ))
                                :
                                    <p className="noClassroomsFound">Sem turmas registradas ...</p>
                            }
                        </form>
                }
                <div className="createBtnSection">
                    <button className="shareCreationButton" onClick={() => handleShareActivity()}>Compartilhar</button>
                    <button className="cancelCreationButton" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}