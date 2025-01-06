import { useState } from "react"
import "./index.css"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteQuestion } from "../../services/QuestionService";

export function EditQuestionForm({question}){
    const navigate = useNavigate()

    function handleDeleteQuestion(){
        try{
            deleteQuestion(question.id).then(() =>{
                location.reload()
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    return(
        <div className="questionFormContainer">
            <div className="statementContainer">
                <p>{question.statement}</p>
                <div className="btnManagementContainer">
                    <button onClick={() => navigate(`/activities/management/edit/question/edit/${question.id}`)} className="btnEditQuestion"><MdEdit /></button>
                    <button onClick={() => handleDeleteQuestion()} className="btnDeleteQuestion"><MdDelete /></button>
                </div>
            </div>
            {
                //-------------------DISCURSIVE----------------------------------------

                question.type === "discursive" ?
                    <div className="discursiveAnswer">
                        <div className="discursiveInputContainer">
                            <textarea id="inputDiscursiveAnswer" value={question.expected_answer} disabled type="text" />
                        </div>
                    </div>
                :   

                //-------------------OBJECTIVE-----------------------------------------

                    <div className="objectiveAnswer">
                        <div className="objectiveOptionsContainer">
                            <div className="buttonContainer">
                                <button>{question.answer1}</button>
                                <button>{question.answer2}</button>
                            </div>
                            <div className="buttonContainer">
                                <button>{question.answer3}</button>
                                <button>{question.answer4}</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}