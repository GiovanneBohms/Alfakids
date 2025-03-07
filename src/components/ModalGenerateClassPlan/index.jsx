import "./index.css"
import { RiAiGenerate2 } from "react-icons/ri";

export function ModalGenerateClassPlan({classPlan, isLoadingClassPlan, generateClassPlan}){
    return(
        <div className="modalBg">
            <div className="modalGenerateClassPlanBody">
                {
                    classPlan === "" ?
                        isLoadingClassPlan ?
                            <p>Carregando plano de aula...</p>
                        :
                            <div className="classPlanContentSection">
                            
                                <label><RiAiGenerate2 /></label>
                                <p>Gere o planejamento da sua aula utilizando IA. Ao clicar no botão abaixo, 
                                    a ferramenta de IA analisará o desempenho do aluno com base na atividade selecionada 
                                    e irá criar um resumo junto com uma sugestão de planejamento para você.
                                </p>
                                <button onClick={() => generateClassPlan()} className="classPlanGenBtn">Gerar</button>
                            </div>
                    :
                        <div className="responseClassPlan">
                            <p>{classPlan}</p>
                        </div>
                        
                }
            </div>
        </div>
    )
}