import "./index.css"
import { HiMiniSpeakerWave } from "react-icons/hi2";

export function MessageBubble({msg, type, speak}){

    //Date Format
    const formatDate = (timestamp) => {
        const today = new Date();
        const isToday = timestamp.toDateString() === today.toDateString();
        const time = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return isToday ? `Hoje às ${time}` : timestamp.toLocaleString();
    }

    if(type === "request"){
        return(
            <div className="messageBubbleContainer requestContainer">
                <div className="messageBubble request">
                    <p className="messageBubbleText">{msg.content}</p>
                </div>
            </div>
        )
    }
    
    if(type === "response"){
        return(
            <div className="messageBubbleContainer responseContainer">
                <div className="messageBubble response">
                    <p id="responseField" className="messageBubbleText">{msg.content}</p>
                </div>
                <button onClick={() => speak(document.getElementById("responseField").innerText)}><HiMiniSpeakerWave /></button>
            </div>
        )
    }

    return null
}