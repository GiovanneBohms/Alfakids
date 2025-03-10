import { useEffect, useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import { deleteAccountable, getAccountablesByStudentId } from "../../services/AccountableService"
import "./index.css"
import { MdDelete, MdEdit } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"
import { ModalAddAccountable } from "../../components/ModalAddAccountable"
import { getCurrentStudentId } from "../../services/StudentService"
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom"

export function StudentConfigPage(){

    const [accountables, setAccountables] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [isModalAddOpen, setIsModalAddOpen] = useState(false)

    const navigate = useNavigate()

    const fetchAccountables = () => {
        getAccountablesByStudentId(getCurrentStudentId()).then((data) => {
            setAccountables(data)
            isLoading(false)
        }).catch((error) => {
            if(error.status == 404){
                console.log("Accountable não encontrado")
            } else{
                console.log(error.message)
            }     
        })
    }

    function handleRemoveAccountable(id_accountable){
        deleteAccountable(id_accountable).then(() => {
            location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchAccountables()
    }, [])

    return(
        <div className="studentPageBody">
            {
                isModalAddOpen && <ModalAddAccountable setIsModalAddAccountableOpen={setIsModalAddOpen} />
            }
            <DashBoard />
            <div className="configContentSection">
                <h1>Configuração</h1>
                <div className="optionsContainer">
                    <ul>
                        <li>
                            <strong>Responsáveis</strong>
                            <div className="option">
                                <p>Seus responsáveis:</p>
                                <button className="optionButton add" onClick={() => setIsModalAddOpen(true)}><IoMdAdd /></button>
                            </div>
                            <ul>
                                {
                                    accountables.map((accountable) => (
                                        <li className="accountableItem">
                                            <p>{accountable.name} - {accountable.email}</p>
                                            <button className="optionButton remove" onClick={() => handleRemoveAccountable(accountable.id)}><MdDelete /></button>
                                            {/* <button className="optionButton edit" onClick={() => navigate("/activities/management/add")}><MdEdit /></button> */}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li>
                            <a className="policyLink" onClick={() => navigate("/policy")}><MdOutlinePrivacyTip />Política de Privacidade</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}