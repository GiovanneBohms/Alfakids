import "./style.css";

export function ModalWindow({setIsModalOpen}){
	return(
        <dialog className="modal" open>
            <div className="centralizaObjeto">
                <p>Question�rio encerrado e enviado</p>
                <button type="button" className="buttonOk" onClick={() => setIsModalOpen(false)}>OK</button>
            </div>
        </dialog>
    )
}