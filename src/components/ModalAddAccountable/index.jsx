import { IoIosSearch } from "react-icons/io"
import "./index.css"

export function ModalAddAccountable({ setIsModalAddAccountableOpen }){
    return(
        <div className="modalAddAccountableBackground">
            <div className="modalMainSection">
                <div className="mainContentContainer">
                    <p className="mainTitle">Adicione um responsável</p>
                    <form className="formAccountable" onSubmit={() => null}>
                        <div>
                            <label>Nome:</label>
                            <input type="text" name="name" />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" />
                        </div>
                        <div>
                            <label>Telefone:</label>
                            <input type="tel" name="telephone" placeholder="xxxxx-xxxx"/>
                        </div>
                        <div>
                            <button className="addButton" onClick={() => setIsModalAddAccountableOpen(false)}>Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}