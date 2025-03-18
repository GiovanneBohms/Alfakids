import { useAuth } from "../../hooks/useAuth"
import "../../styles/DashBoardStyles.css"
import { useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md";
import { LuNotebook } from "react-icons/lu";
import { GoCopilot } from "react-icons/go";
import { DiAptana } from "react-icons/di";

export function DashBoard(){
    const navigate = useNavigate()

    const { logout } = useAuth()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button title="Assistente Virtual" className="navigationButton" onClick={() => navigate("/chatbot")}><GoCopilot className="navigationIcon" /></button>
                    <button title="Atividades" className="navigationButton" onClick={() => navigate("/activities")}><LuNotebook className="navigationIcon" /></button>
                    <button title="Configurações" className="navigationButton" onClick={() => navigate("/config")}><DiAptana className="navigationIcon" /></button>
                </div>
                <div className="navigationContainer">
                    <button title="Sair" className="navigationButton pinkOption" onClick={() => logout()}><MdLogout className="navigationIcon" /></button>
                </div>
            </section>
        </div>
        
    )
}
