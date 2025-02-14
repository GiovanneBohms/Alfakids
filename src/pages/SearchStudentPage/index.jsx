import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import "./index.css"
import { IoIosSearch } from "react-icons/io";

export function SearchStudentPage(){
    return(
        <div className="professorPageBody">
            <ProfessorDashBoard />
            <div className="searchContentSection">
                <h1>Pesquisa</h1>
                <div className="searchBarContainer">
                    <IoIosSearch className="searchIcon" />
                    <input type="text" placeholder="Pesquise por email..." className="searchBar" />
                </div>
                <div className="studentsListSection">
                    <ul className="studentsList">
                        <li>Felipe Martins</li>
                        <li>Felipe Martins</li>
                        <li>Felipe Martins</li>
                        <li>Felipe Martins</li>
                        <li>Felipe Martins</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}