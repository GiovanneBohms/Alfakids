import { useEffect, useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import './index.css'
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../services/ChatbotService";
import { LoadingIcon } from "../../components/LoadingIcon"
import { getCurrentStudentId, getStudentById } from "../../services/StudentService";
import { useNavigate } from "react-router-dom";

export function ChatbotPage(){

    const [messages, setMessages] = useState([]);
    const [responses, setResponses] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoadingResponse, setIsLoadingResponse] = useState(false)
    const [isLoding, setIsLoading] = useState(true)
    const [student, setStudent] = useState()

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
        if(inputMessage.trim() !== ""){
            setIsLoadingResponse(true)
            const newMessage = {
                text: inputMessage,
                timestamp: new Date(),
            };
            setMessages([...messages, newMessage]);
            setInputMessage("");

            sendMessage(inputMessage).then((response) => {
                const newResponse = {
                    text: response,
                    timestamp: new Date(),
                };

                setResponses([...responses, newResponse])
                setIsLoadingResponse(false)
                speak(newResponse.text)
            })
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
        utterThis.voice = voices[16]

        synth.speak(utterThis);
    }

    if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = loadVoices;
    } else {
        loadVoices();
    }

    //--------------------------------------------------------------
    
    //Date Format
    const formatDate = (timestamp) => {
        const today = new Date();
        const isToday = timestamp.toDateString() === today.toDateString();
        const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return isToday ? `Hoje às ${time}` : timestamp.toLocaleString();
    }

    useEffect(() => {
        fetchStudent()
    }, [])

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
                            <div>
                                <h1>Assistente Virtual</h1>
                            </div>
                            <div className="chatOutput">
                                {messages.length > 0 ? (
                                    messages.map((msg, index) => (
                                        <div key={index} className="interactionContainer">
                                        <div className="messageBubble">
                                                <p className="messageBubbleText">{msg.text}</p>
                                                <span className="timestamp">{formatDate(msg.timestamp)}</span>
                                            </div>
                                            {
                                                responses[index] !== undefined ?
                                                    <div className="responseBubble">
                                                        <p className="messageBubbleText">{responses[index].text}</p>
                                                        <span className="timestamp">{formatDate(responses[index].timestamp)}</span>
                                                    </div>
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