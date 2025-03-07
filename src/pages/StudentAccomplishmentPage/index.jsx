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
import { getCurrentProfessorId, getProfessorById } from "../../services/ProfessorService"
import { HiPencilAlt } from "react-icons/hi";
import { sendUniqueMessage } from "../../services/ChatbotService"
import { ModalGenerateClassPlan } from "../../components/ModalGenerateClassPlan"

export function StudentAccomplishmentPage(){
    const { id_activity, id_student } = useParams()

    const [activity, setActivity] = useState(null)
    const [student, setStudent] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingClassPlan, setIsLoadingClassPlan] = useState(false)
    const [classPlan, setClassPlan] = useState("")
    const [isModalClassPlanOpen, setIsModalClassPlanOpen] = useState(false)

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
            console.log("Fetch Questions")
            if(answers.length == 0){
                getQuestionsByActivityId(id_activity).then((data) => {
                    fetchAnswers(data)
                })
            }
        } catch(error){
            console.log(error.message)
        }
    }

    function fetchAnswers(questions){
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

    function generateClassPlan(){
        setIsLoadingClassPlan(true)

        getProfessorById(getCurrentProfessorId()).then((professor) =>{
            let context = `Analise a sequência de itens a seguir, a qual consistem em uma relação de questão, resposta correta ou esperada e, por último a resposta que o aluno deu. Quero que você, após analisar cada questão com sua respectiva resposta dada pelo aluno, gere um resumo das dificuldades que esse aluno teve e dê uma ideia de planejamento de aula para o professor desse aluno. O nome do professor é ${professor.name} Fale diretamente para o professor suas observações. A relação é a seguinte: \n`

            answers.forEach((answer) => {
                if(answer.type === "discursive"){
                    context += `Questão: ${answer.statement}\n
                                Resposta Esperada: ${answer.expected_answer}\n
                                Resposta do Aluno: ${answer.student_answer}\n`
                } else{
                    context += `Questão: ${answer.statement}\n
                    Resposta Certa: ${answer.right_answer}\n
                    Resposta do Aluno: ${answer.student_answer}\n`
                }
            })

            let responseText = "";
            
            sendUniqueMessage(context, (chunk) => {
                responseText += chunk.response;

                setClassPlan(responseText)

            }).then(() => {
                setIsLoadingSugestion(false);
            });
        }).catch((error) => {
            console.log(error.message)
        })

        
    }

    useEffect(() => {
        fetchActivity()
        fetchStudent()
        fetchQuestions()
    }, [])

    return(
        <div className="selectedActivityPage">
            {
                isModalClassPlanOpen &&
                    <ModalGenerateClassPlan classPlan={classPlan} isLoadingClassPlan={isLoadingClassPlan} generateClassPlan={generateClassPlan} />
            }
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
                        {
                            answers.map((answer, index) => (
                                <AnswerForm key={index} answer={answer} student_name={student.name} index={index}/>
                            ))
                        }
                    </div>
            }
            {
                getCurrentProfessorId() != null &&
                    <button onClick={() => setIsModalClassPlanOpen(!isModalClassPlanOpen)} className="classPlanBtn"><HiPencilAlt  /></button>
            }
        </div>
    )
}