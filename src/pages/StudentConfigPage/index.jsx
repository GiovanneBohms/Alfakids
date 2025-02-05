import { useEffect, useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import { getAccountablesByStudentId } from "../../services/AccountableService"
import "./index.css"
import { MdEdit } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"
import { ModalAddAccountable } from "../../components/ModalAddAccountable"

export function StudentConfigPage(){

    const [accountables, setAccountables] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [isModalAddOpen, setIsModalAddOpen] = useState(false)

    const fetchAccountables = () => {
        getAccountablesByStudentId().then((data) => {
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
                                <button className="optionButton edit" onClick={() => navigate("/activities/management/add")}><MdEdit /></button>
                            </div>
                            <ul>
                                {
                                    accountables.map((accountable) => (
                                        <li>
                                            <p>{accountable.name} - {accountable.email}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}