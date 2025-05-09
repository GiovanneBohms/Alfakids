import "./index.css"

export function ModalRemoveItems({ elementsToRemove, handleRemoveElements, setIsModalRemoveOpen }){
    return(
        <div className="modalBg">
            <div className="modalRemoveMainSection">
                <h2>Deseja remover {elementsToRemove.length} itens?</h2>
                <div className="createBtnSection">
                    <button className="removeBtn" onClick={() => handleRemoveElements(elementsToRemove)}>Remover</button>
                    <button onClick={() => setIsModalRemoveOpen(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}