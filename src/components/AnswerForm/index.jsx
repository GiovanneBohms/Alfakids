import { useState } from "react"
import { LoadingIcon } from "../LoadingIcon"
import "./index.css"
import { sendUniqueMessage } from "../../services/ChatbotService"
import { MdOutlineTipsAndUpdates } from "react-icons/md";

export function AnswerForm({ answer, student_name, index }){
    const [isLoadingSugestion, setIsLoadingSugestion] = useState(false)
    const [sugestion, setSugestion] = useState("")

    function sugestCorrectAnswer(){
        setIsLoadingSugestion(true)

        let content = ""

        if(answer.type === "discursive"){
            content = `Faça a correção da seguinte pergunta: ${answer.statement}; O aluno respondeu o seguinte: ${answer.student_answer}; A resposta esperada pelo professor é a seguinte: ${answer.expected_answer}. O nome do aluno é ${student_name}. Fale diretamente com o aluno ajudando-o a resolver essa questão.`;
        } else{
            content = `Faça a correção da seguinte pergunta: ${answer.statement}; O aluno respondeu o seguinte: ${answer.student_answer}; A resposta certa é a seguinte: ${answer.right_answer}. O nome do aluno é ${student_name}. Fale diretamente com o aluno ajudando-o a resolver essa questão.`;
        }
        
        let responseText = "";

        sendUniqueMessage(content, (chunk) => {
            responseText += chunk.response;

            setSugestion(responseText)

        }).then(() => {
            setIsLoadingSugestion(false);
        });
    }

    return(
        <div className="answerFormContainer">
            <div className="answerFormStatementContainer">
                <p>{index+1} - {answer.statement}</p>
            </div>
            {
                //-------------------DISCURSIVE----------------------------------------

                answer.type === "discursive" ?
                    <div className="answerFormDiscursiveAnswer">
                        <div className="discursiveInputContainer">
                            <textarea id="inputDiscursiveAnswer" value={answer.expected_answer} disabled type="text" />
                        </div>
                        {
                            answer.student_answer ?
                                <div className="discursiveInputContainer">
                                    <label>Resposta do Aluno:</label>
                                    <textarea id="" value={answer.student_answer} disabled type="text"></textarea>
                                </div>
                            :
                                <div className="discursiveInputContainer">
                                    <label>Resposta do Aluno:</label>
                                    <textarea id="" value="" disabled type="text"></textarea>
                                </div>
                        }
                        <div className="sugestionTextDiscursive">
                            <p>{sugestion}</p>
                        </div>
                    </div>
                :   

                //-------------------OBJECTIVE-----------------------------------------

                    <div className="answerFormObjectiveAnswer">
                        <div className="objectiveOptionsContainer">
                            <div className="buttonContainer">
                                <button>{answer.answer1}</button>
                                <button>{answer.answer2}</button>
                            </div>
                            <div className="buttonContainer">
                                <button>{answer.answer3}</button>
                                <button>{answer.answer4}</button>
                            </div>
                        </div>
                        {
                            answer.student_answer ?
                                <div className="objectiveAnswerContainer">
                                    <label>Resposta do Aluno:</label>
                                    <textarea id="" value={answer.student_answer} disabled type="text"></textarea>
                                </div>
                            :
                                <div className="objectiveAnswerContainer">
                                    <label>Resposta do Aluno:</label>
                                    <textarea id="" value="" disabled type="text"></textarea>
                                </div>
                        }
                        <div className="sugestionTextObjective">
                            <p>{sugestion}</p>
                        </div>
                    </div>
            }
            <div className="sugestionContainer">
                {
                    isLoadingSugestion ?
                        <button className="sugestionBtnLoading">Carregando...</button>
                    :
                        <button className="sugestionBtn" onClick={() => sugestCorrectAnswer()}><MdOutlineTipsAndUpdates /></button>
                }
            </div>
        </div>
    )
}