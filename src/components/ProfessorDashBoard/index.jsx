import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/DashBoardStyles.css"
import { MdLogout } from "react-icons/md"
import { SiGoogleclassroom } from "react-icons/si";
import { LuNotebookPen } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";

export function ProfessorDashBoard(){
    const navigate = useNavigate()

    const { logout } = useAuth()

    return(
        <div className="dashBoardSection">
            <section className="dashBoardContainer">
                <div className="navigationContainer">
                    <button title="Gerenciar atividades" className="navigationButton" onClick={() => navigate("/activities/management")}><LuNotebookPen className="navigationIcon" /></button>
                    <button title="Gerenciar turmas" className="navigationButton" onClick={() => navigate("/classroom/management")}><SiGoogleclassroom className="navigationIcon" /></button>
                    <button title="Pesquisar ficha do aluno" className="navigationButton" onClick={() => navigate("/search")}><IoIosSearch className="navigationIcon" /></button>
                </div>
                <div className="navigationContainer">
                    <button title="Sair" className="navigationButton pinkOption" onClick={() => logout()}><MdLogout className="navigationIcon" /></button>
                </div>
            </section>
        </div>
    )
}