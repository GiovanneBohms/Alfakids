import { useEffect, useRef } from "react";
import "./style.css";

export function ModalWindow({setIsModalOpen})
{
    //const modal = useRef(null);

    /*function closeModal()
    { modal.current.close(); }*/

	return
    (
	     <dialog className="modal">
            <div className="centralizaObjeto">
                <p>Questionário encerrado e enviado</p>
                <button type="button" className="buttonOk" onClick={() => setIsModalOpen(false)}>OK</button>
            </div>
         </dialog>
    );
}