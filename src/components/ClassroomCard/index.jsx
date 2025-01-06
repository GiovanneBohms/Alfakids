import "./index.css"
import { FaFolder } from "react-icons/fa";

export function ClassroomCard({classroom}){
    return(
        <div className="classroomCard">
            <p><FaFolder /></p>
            <p>{classroom.number}/{classroom.year}</p>
        </div>
    )
}