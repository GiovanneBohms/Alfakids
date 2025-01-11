import { useAuth } from "../../hooks/useAuth"
import "./index.css"
import { useNavigate } from "react-router-dom"

export function DashBoard(){
    const navigate = useNavigate()

    const { logout } = useAuth()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => navigate("/chatbot")}>Chatbot</button>
                    <button className="navigationButton" onClick={() => navigate("/activities")}>Activities</button>
                </div>
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => logout()}>Sign out</button>
                </div>
            </section>
        </div>
        
    )
}
