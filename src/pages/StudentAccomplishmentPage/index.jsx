import { useNavigate, useParams } from "react-router-dom"
import "./index.css"
import { useEffect, useState } from "react"
import { getActivityById } from "../../services/ActivityService"
import { getQuestionsByActivityId } from "../../services/QuestionService"
import { LoadingIcon } from "../../components/LoadingIcon"
import { ProfessorDashBoard } from "../../components/ProfessorDashBoard"
import { getCurrentStudentId, getStudentById } from "../../services/StudentService"
import { getAnswerByQuestionAndStudentId } from "../../services/AnswerService"
import { AnswerForm } from "../../components/AnswerForm"
import { DashBoard } from "../../components/DashBoard"
import { sendMessage, sendUniqueMessage } from "../../services/ChatbotService"

export function StudentAccomplishmentPage(){
    const { id_activity, id_student } = useParams()

    const [activity, setActivity] = useState(null)
    const [student, setStudent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingSugestion, setIsLoadingSugestion] = useState(false)

    const [answers, setAnswers] = useState([])

    function fetchActivity(){
        try{
            getActivityById(id_activity).then((data_activity) => {
                setActivity(data_activity)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error.message)
        }
    }

    function fetchStudent(){
        try{
            getStudentById(id_student).then((student) => {
                setStudent(student)
            }).catch((error)=>{
                console.log(error.message)
            })
        }
        catch(error){
            console.log(error.message)
        }
    }

    function fetchQuestions(){
        try{
            getQuestionsByActivityId(id_activity).then((data) => {
                fetchAnswers(data)
            }).catch((error) => {
                console.log(error.message)
            })
        } catch(error){
            console.log(error.message)
        }
    }

    function fetchAnswers(questions){
        console.log("Questions: ", questions)
        const sugestion = ""
        for(let i = 0; i < questions.length; i++){
            getAnswerByQuestionAndStudentId(questions[i].id, id_student).then((data) => {
                const id_question = questions[i].id
                const statement = questions[i].statement
                const type = questions[i].type
                const student_answer = data.answer

                if(type == "discursive"){
                    const expected_answer = questions[i].expected_answer

                    answers.push({id_question, statement, type, expected_answer, student_answer, sugestion})
                } else{
                    const answer1 = questions[i].answer1
                    const answer2 = questions[i].answer2
                    const answer3 = questions[i].answer3
                    const answer4 = questions[i].answer4
                    const right_answer = questions[i].right_answer

                    answers.push({id_question, statement, type, answer1, answer2, answer3, answer4, right_answer, student_answer, sugestion})
                }

                if(i == (questions.length - 1)){
                    setIsLoading(false)
                }
            }).catch((error) => {
                if(error.status == 404){
                    const id_question = questions[i].id
                    const statement = questions[i].statement
                    const type = questions[i].type
                    const student_answer = null

                    if(type == "discursive"){
                        const expected_answer = questions[i].expected_answer

                        answers.push({id_question, statement, type, expected_answer, student_answer, sugestion})
                    } else{
                        const answer1 = questions[i].answer1
                        const answer2 = questions[i].answer2
                        const answer3 = questions[i].answer3
                        const answer4 = questions[i].answer4
                        const right_answer = questions[i].right_answer

                        answers.push({id_question, statement, type, answer1, answer2, answer3, answer4, right_answer, student_answer, sugestion})
                    }

                    if(i == (questions.length - 1)){
                        setIsLoading(false)
                    }
                } else{
                    console.log(error.message)
                }
            })
        }
    }

    function sugestCorrectAnswer(answer, index){
        setIsLoadingSugestion(true)
        let content = ""
        if(answer.type === "discursive"){
            content = `Faça a correção da seguinte pergunta: ${answer.statement}; O aluno respondeu o seguinte: ${answer.student_answer}; A resposta esperada pelo professor é a seguinte: ${answer.expected_answer}. Fale diretamente com o aluno ajudando-o a resolver essa questão.`;
        } else{
            content = `Faça a correção da seguinte pergunta: ${answer.statement}; O aluno respondeu o seguinte: ${answer.student_answer}; A resposta certa é a seguinte: ${answer.right_answer}. Fale diretamente com o aluno ajudando-o a resolver essa questão.`;
        }
        
        let responseText = ""; // Acumular a resposta aqui
        console.log("Context: ", content)
        sendUniqueMessage(content, (chunk) => {
                
            responseText += chunk.response;

            answers[index] = {...answers[index], sugestion: responseText}
        }).then(() => {
            setIsLoadingSugestion(false);
        });
    }

    useEffect(() => {
        fetchActivity()
        fetchStudent()
        fetchQuestions()
    }, [])

    return(
        <div className="selectedActivityPage">
            {
                getCurrentStudentId() != null ?
                    <DashBoard />
                :
                    <ProfessorDashBoard />
            }
            
            {
                isLoading ?
                    <LoadingIcon />
                :
                    <div className="questionsSection">
                        <h1>Envio de {student.name}</h1>
                        <h2>Atividade: {activity.title}</h2>
                        {console.log(answers)}
                        {
                            answers.map((answer, index) => (
                                <AnswerForm key={index} answer={answer} index={index} generateSugestion={sugestCorrectAnswer}/>
                            ))
                        }
                    </div>
            }
        </div>
    )
}