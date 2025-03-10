import { useEffect } from "react";
import "./index.css"
import { RiAiGenerate2 } from "react-icons/ri";
import { formatAIResponse } from "../../../utils/FormatAIResponse";

export function ModalGenerateClassPlan({classPlan, done, isLoadingClassPlan, generateClassPlan}){
    // useEffect(() => {
    //     setTimeout(() => {
    //         const classPlanDiv = document.getElementById("classPlanDiv");
    //         if (!classPlanDiv) return;
    
    //         let texto = classPlanDiv.textContent || "";
    
    //         let partes = texto.split(/\*\*(.*?)\*\*/g);
    
    //         classPlanDiv.innerText = "";
    
    //         partes.forEach((parte, index) => {
    //             if (index % 2 === 1) {
    //                 let negrito = document.createElement("h1");
    //                 negrito.textContent = parte;
    //                 classPlanDiv.appendChild(negrito);
    //             } else {
    //                 classPlanDiv.appendChild(document.createTextNode(parte));
    //             }
    //         });
    //         updateText = true
    //     }, 100);
    // }, [classPlan])

    useEffect(() => {
        if(done){
            formatAIResponse("classPlanDiv")
        }
    }, [done])

    return(
        <div className="modalBg">
            <div className="modalGenerateClassPlanBody">
                {
                    classPlan === "" ?
                        <div className="classPlanContentSection">
                        
                            <label><RiAiGenerate2 /></label>
                            <p>
                                Gere o planejamento da sua aula utilizando IA. Ao clicar no botão abaixo, 
                                a ferramenta de IA analisará o desempenho do aluno com base na atividade selecionada 
                                e irá criar um resumo junto com uma sugestão de planejamento para você.
                            </p>
                        </div>
                    :
                        <div id="classPlanDiv" className="responseClassPlan">
                            {classPlan}
                        </div>
                        
                }
                {
                    !isLoadingClassPlan ?
                        <button onClick={() => generateClassPlan()} className="classPlanGenBtn">Gerar</button>
                    :
                        <button className="classPlanGenBtnLoading">Gerando plano de aula...</button>
                }
                
            </div>
        </div>
    )
}