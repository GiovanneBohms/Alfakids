import { useAuth } from "../../hooks/useAuth"
import "./index.css"
import { useNavigate } from "react-router-dom"
import { MdLogout } from "react-icons/md";

export function DashBoard(){
    const navigate = useNavigate()

    const { logout } = useAuth()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => navigate("/chatbot")}>Chatbot</button>
                    <button className="navigationButton" onClick={() => navigate("/activities")}>Atividades</button>
                </div>
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => logout()}><MdLogout className="iconLogOut" /></button>
                </div>
            </section>
        </div>
        
    )
}
