import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/DashBoardStyles.css"
import { MdLogout } from "react-icons/md"
import { SiGoogleclassroom } from "react-icons/si";
import { LuNotebookPen } from "react-icons/lu";

export function ProfessorDashBoard(){
    const navigate = useNavigate()

    const { logout } = useAuth()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => navigate("/activities/management")}><LuNotebookPen className="navigationIcon" /></button>
                    <button className="navigationButton" onClick={() => navigate("/classroom/management")}><SiGoogleclassroom className="navigationIcon" /></button>
                </div>
                <div className="navigationContainer">
                    <button className="navigationButton" onClick={() => logout()}><MdLogout className="navigationIcon" /></button>
                </div>
            </section>
        </div>
    )
}