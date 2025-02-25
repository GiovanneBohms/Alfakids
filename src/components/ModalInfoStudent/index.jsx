import { IoIosCloseCircle } from "react-icons/io"
import "./index.css"

export function ModalInfoStudent({student, accountables, setModalOpen}){
    return(
        <div className="modalInfoStudentBg">
            <div className="modalInfoStudentContainer">
                <div className="closeIcon" onClick={() => setModalOpen(false)}>
                    <IoIosCloseCircle className="closeIconItem" />
                </div>
                <h1>Informações do Aluno</h1>
                <p>Nome: {student.name}</p>
                <p>Email: {student.email}</p>
                <p>Idade: {student.age}</p>
                <p>Nível de Autismo: {student.autism_level}</p>
                <h3>Responsáveis:</h3>
                <ul>
                    {
                        accountables.length == 0 ?
                            <li className="noAccountablesCase">
                                <p>Não há responsáveis cadastrados...</p>
                            </li>
                        :
                        accountables.map((accountable) => (
                            <li>
                                <div>
                                    <p>Nome: {accountable.name}</p>
                                    <p>Email: {accountable.email}</p>
                                    <p>Telefone: {accountable.telephone}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}