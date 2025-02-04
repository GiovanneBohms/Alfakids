import { DashBoard } from "../../components/DashBoard"
import "./index.css"

export function StudentConfigPage(){
    return(
        <div className="studentPageBody">
            <DashBoard />
            <div className="configContentSection">
                <h1>Configuração</h1>
                <div className="optionsContainer">
                    <ul>
                        <li>
                            <strong>Responsáveis</strong>
                            <div className="option">
                                <p>Seus responsáveis:</p>
                                <button>Add</button>
                            </div>
                            <ul>
                                <li>
                                    <p>Elisabete Martins de Oliveira - elisabete@gmail.com</p>
                                </li>
                                <li>
                                    <p>Waldyr Fagunde de Medeiros - waldyr@gmail.com</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}