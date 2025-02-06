import { IoIosSearch } from "react-icons/io"
import "./index.css"
import { createAccountable } from "../../services/AccountableService"
import { useState } from "react"
import { LoadingIcon } from "../LoadingIcon"
import { getCurrentStudentId } from "../../services/StudentService"

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
        }).catch((error) => alert(error.message))
    }

    return(
        <div className="modalAddAccountableBackground">
            <div className="modalMainSection">
                <div className="mainContentContainer">
                    <p className="mainTitle">Adicione um responsável</p>
                    <form className="formAccountable" id="formAccountable" onSubmit={(event) => handleCreateAccountable(event)}>
                        <div>
                            <label>Nome:</label>
                            <input type="text" name="name" />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <input type="tel" name="telephone" placeholder="xxxxx-xxxx"/>
                        </div>
                        <div>
                            {
                                isLoading ?
                                    <button className="addButton"><LoadingIcon /></button>
                                :
                                    <button className="addButton" type="submit">Adicionar</button> 
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}