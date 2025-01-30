import { useState } from "react"
import { DashBoard } from "../../components/DashBoard"
import './index.css'
import { IoMdSend } from "react-icons/io";

export function ChatbotPage(){

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = () => {
        if(inputMessage.trim() !== ""){
            const newMessage = {
                text: inputMessage,
                timestamp: new Date(),
            };
            setMessages([...messages, newMessage]);
            setInputMessage("");
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
        <div className="chatbotBody">
            <DashBoard />

            <div className="chatbotContainer">
                <div className="chatbotContentSection">
                    <div>
                        <h1>Assistente Virtual</h1>
                    </div>
                    <div className="chatOutput">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className="messageBubble">
                                    <p className="messageBubbleText">{msg.text}</p>
                                    <span className="timestamp">{formatDate(msg.timestamp)}</span>
                                </div>
                        ))
                        ) : (
                            <p className="placeholder"></p>
                        )}
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

                    <button onClick={handleSendMessage} className="sendButton">
                        <IoMdSend />
                    </button>
                </div>      
            </div>
        </div>
    );
}