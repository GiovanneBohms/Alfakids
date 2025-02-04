import { useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import './index.css'
import { IoMdSend } from "react-icons/io";
import { sendMessage } from "../../services/ChatbotService";
import { LoadingIcon } from "../../components/LoadingIcon"

export function ChatbotPage(){

    const [messages, setMessages] = useState([]);
    const [responses, setResponses] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoadingResponse, setIsLoadingResponse] = useState(false)

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
                    text: response.text,
                    timestamp: new Date(),
                };

                setResponses([...responses, newResponse])
                setIsLoadingResponse(false)
            })
        }
    };
    
    //Date Format
    const formatDate = (timestamp) => {
        const today = new Date();
        const isToday = timestamp.toDateString() === today.toDateString();
        const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return isToday ? `Hoje às ${time}` : timestamp.toLocaleString();
    }

    return(
        <div className="studentPageBody">
            <DashBoard />

            <div className="chatbotContainer">
                <div className="chatbotContentSection">
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
        </div>
    );
}