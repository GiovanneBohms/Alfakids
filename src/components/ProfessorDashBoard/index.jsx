import { useNavigate } from "react-router-dom"

export function ProfessorDashBoard(){
    const navigate = useNavigate()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => navigate("/activities/management")}>Activities</button>
                    <button className="navigationButton" onClick={() => navigate("/classroom/management")}>Classrooms</button>
                </div>
                <div className="navigationContainer">
                    <button className="navigationButton">Sign out</button>
                </div>
            </section>
        </div>
    )
}