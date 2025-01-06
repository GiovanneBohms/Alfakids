import "./index.css"
import { useNavigate } from "react-router-dom"

export function DashBoard(){
    const navigate = useNavigate()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => navigate("/chatbot")}>Chatbot</button>
                    <button className="navigationButton" onClick={() => navigate("/activities")}>Activities</button>
                </div>
                <div className="navigationContainer">
                    <button className="navigationButton">Sign out</button>
                </div>
            </section>
        </div>
        
    )
}
