import { useEffect, useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import './index.css'
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../services/ChatbotService";
import { LoadingIcon } from "../../components/LoadingIcon"
import { getCurrentStudentId, getStudentById } from "../../services/StudentService";
import { useNavigate } from "react-router-dom";
import { MessageBubble } from "../../components/MessageBubble";
import { formatAIResponse } from "../../utils/FormatAIResponse.jsx";

export function ChatbotPage(){

    const [messages, setMessages] = useState([]);
    const [responses, setResponses] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoadingResponse, setIsLoadingResponse] = useState(false)
    const [isLoding, setIsLoading] = useState(true)
    const [student, setStudent] = useState()
    const [done, setDone] = useState(false)

    const navigate = useNavigate()

    const synth = window.speechSynthesis;
    let voices

    const fetchStudent = () => {
        getStudentById(getCurrentStudentId()).then((data) => {
            setStudent(data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error.message)
        }) 
    }

    const handleSendMessage = () => {
        let context = []
        
        if (inputMessage.trim() !== "") {
            
            setIsLoadingResponse(true);

            const newMessage = {
                content: inputMessage,
                role: "user",
            };

            if(messages.length !== 0){
                for (let i = 0; i < messages.length; i++) {
                    context.push(messages[i])
                    context.push(responses[i])
                    context.push(newMessage)
                }
                console.log(context)
            } else{
                context.push(newMessage)
            }

            setMessages([...messages, newMessage]);
            setInputMessage("");

            let responseText = ""; // Acumular a resposta aqui

            console.log("Context: ", context)
            sendMessage(context, (chunk) => {
                
                responseText += chunk.message.content;
                setDone(chunk.done)

                responses.push({})
                setResponses((prevResponses) => {
                    const updatedResponses = [...prevResponses];
                    console.log(updatedResponses.length)
                    const index = updatedResponses.length - 1;

                    updatedResponses[index] = {...updatedResponses[index], content: responseText, role: "assistant"};

                    return updatedResponses;
                });
            }).then(() => {
                setIsLoadingResponse(false);
                speak(responseText);
            });
        }
    };

    //------------------Voice Speech Module-----------------------

    function loadVoices() {
        voices = synth.getVoices();
    }

    function speak(text){
        synth.cancel();
        voices = synth.getVoices();
        const utterThis = new SpeechSynthesisUtterance(text);

        console.log(voices)
        //Indíces - 0 para o brasileiro masculino, 1 para brasileira feminina e 16 para outra brasileira feminina
        utterThis.voice = voices[24]

        synth.speak(utterThis);
    }

    if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = loadVoices;
    } else {
        loadVoices();
    }

    //--------------------------------------------------------------
    
    useEffect(() => {
        fetchStudent()
    }, [])

    // useEffect(() => {
    //     if(done){
    //         formatAIResponse("responseField")
    //     }
    // }, [done])

    return(
        <div className="studentPageBody">
            <DashBoard />

            {
                isLoding ?
                    <LoadingIcon />
                :
                    <div className="chatbotContainer">
                        <div className="chatbotContentSection">
                            <p className="welcomeText" onClick={() => navigate("/config")}>Bem vindo, {student.name}</p>
                            <div className="chatOutput">
                                {messages.length > 0 ? (
                                    messages.map((msg, index) => (
                                        <div key={index} className="interactionContainer">
                                            <MessageBubble msg={msg} type="request" />
                                            {
                                                responses[index] !== undefined ?
                                                    <MessageBubble msg={{ content: formatAIResponse(responses[index].content), role: responses[index].role }} type="response" />
                                                :
                                                    <div className="responseBubble">
                                                        <LoadingIcon />
                                                    </div>
                                            }
                                        </div>
                                        
                                    ))
                                ) 
                                :
                                    null
                                }
                            </div>
                            
                        </div>
                        <div className="userInputContainer">
                            <textarea 
                                placeholder="Digite sua mensagem aqui..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault(); // Evita a quebra de linha com apenas Enter
                                        handleSendMessage(); // Chama a função de submit
                                    }
                                }}
                                name="chatInput" 
                                id="chatInputBox"
                                className="inputBox"
                                cols={143}
                                rows={7}
                            />
                            {
                                !isLoadingResponse ?
                                    <button onClick={handleSendMessage} className="sendButton">
                                        <IoMdSend />
                                    </button>
                                :
                                    <button className="sendButtonLoading">
                                        <LoadingIcon />
                                    </button>
                            }
                            
                        </div>      
                    </div>
            }
        </div>
    );
}