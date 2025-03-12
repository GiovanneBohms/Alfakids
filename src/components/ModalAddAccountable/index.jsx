import "./index.css"
import { createAccountable } from "../../services/AccountableService"
import { useState } from "react"
import { LoadingIcon } from "../LoadingIcon"
import { getCurrentStudentId } from "../../services/StudentService"
import { IoIosCloseCircle } from "react-icons/io";

export function ModalAddAccountable({ setIsModalAddAccountableOpen }){
    const [isLoading, setIsLoading] = useState(false)

    function handleCreateAccountable(event){
        event.preventDefault()

        setIsLoading(true)

        const loginForm = document.getElementById("formAccountable")
        const formData = new FormData(loginForm)

        const name = formData.get("name")
        const email = formData.get("email")
        const telephone = formData.get("telephone")
        const id_student = getCurrentStudentId()

        createAccountable({name, email, telephone, id_student}).then(() => {
            location.reload()
        }).catch((error) => console.log(error.message))
    }

    return(
        <div className="modalBg">
            <div className="modalAccountableMainSection">
                <div className="mainAccountableContentContainer">
                    <div className="closeIcon" onClick={() => setIsModalAddAccountableOpen(false)}>
                        <IoIosCloseCircle className="closeIconItem" />
                    </div>
                    <p className="mainTitle">Adicione um responsável</p>
                    <form className="formAccountable" id="formAccountable" onSubmit={(event) => handleCreateAccountable(event)}>
                        <div className="formAccountableInputs">
                            <label>Nome:</label>
                            <input type="text" name="name" />
                        </div>
                        <div className="formAccountableInputs">
                            <label>Email:</label>
                            <input type="email" name="email" />
                        </div>
                        <div className="formAccountableInputs">
                            <label>Telefone:</label>
                            <input type="tel" name="telephone" placeholder="xxxxx-xxxx"/>
                        </div>
                        <div className="formAccountableInputs">
                            {
                                isLoading ?
                                    <button className="addAccountableButtonLoading"><LoadingIcon /></button>
                                :
                                    <button className="addAccountableButton" type="submit">Adicionar</button> 
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}