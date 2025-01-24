import { fulfillClassroom, closeClassroom } from "../../services/ClassroomService"
import "./index.css"

export function ModalChangeClassroomVisibility({ classroom }){

    function changeToFulfilled(){
        try{
            fulfillClassroom(classroom.id).then(() => {
                location.reload()
            }).catch((error) => {
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error.message)
        }
    }

    function changeToCanceled(){
        try{
            closeClassroom(classroom.id).then(() => {
                location.reload()
            }).catch((error) => {
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error.message)
        }
    }

    return(
        <div className="modalChangeVisibilityContainer">
            {
                classroom.status !== "FULFILLED" ?
                    <div onClick={() => changeToFulfilled()}>
                        Mudar para FULFILLED
                    </div>
                :
                    null
            }
            {
                classroom.status !== "CLOSED" ?
                    <div onClick={() => changeToCanceled()}>
                        Mudar para CLOSED
                    </div>
                :
                    null
            }
        </div>
    )
}