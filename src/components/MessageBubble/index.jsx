import "./index.css"

export function MessageBubble({msg, type}){

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
                    {/* <span className="timestamp">{formatDate(msg.timestamp)}</span> */}
                </div>
            </div>
        )
    }
    
    if(type === "response"){
        return(
            <div className="messageBubbleContainer responseContainer">
                <div className="messageBubble response">
                    <p id="responseField" className="messageBubbleText">{msg.content}</p>
                    {/* <span className="timestamp">{formatDate(msg.timestamp)}</span> */}
                </div>
            </div>
        )
    }

    return null
}