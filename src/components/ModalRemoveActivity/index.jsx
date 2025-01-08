import "./index.css"

export function ModalRemoveActivity({ numActivities, activitiesToRemove, handleRemoveActivities, setIsModalRemoveOpen }){
    return(
        <div className="modalRemoveActivityBackground">
            <div className="modalMainSection">
                <h2>Deseja remover {numActivities} itens da lista de atividades?</h2>
                <div className="createBtnSection">
                    <button className="removeBtn" onClick={() => handleRemoveActivities(activitiesToRemove)}>Remove</button>
                    <button onClick={() => setIsModalRemoveOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}