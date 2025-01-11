import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function ProfessorDashBoard(){
    const navigate = useNavigate()

    const { logout } = useAuth()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => navigate("/activities/management")}>Activities</button>
                    <button className="navigationButton" onClick={() => navigate("/classroom/management")}>Classrooms</button>
                </div>
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => logout()}>Sign out</button>
                </div>
            </section>
        </div>
    )
}