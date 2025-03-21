import "./index.css"
import { MdDone } from "react-icons/md";

export function ModalAccomplishConfirm(){
    return(
        <div className="modalBg">
            <div id="modal">
                <div className="centralizaObjeto">
                    <MdDone className="doneIcon" />
                    <p>Enviado</p>
                {/* <button type="button" id="buttonOk">OK</button> */}
                </div>
            </div>
        </div>
    )
}