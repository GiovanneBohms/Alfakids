const chatURL = "http://localhost:11434/api/chat"
const uniqueMessageURL = "http://localhost:11434/api/generate"

export async function sendMessage(context, onUpdate) {
    console.log("Recebi: ", context)
    const data = {
        model: "AlfaCopilot",
        messages: context
    };
    
    const response = await fetch(chatURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        console.log(chunk)
        // Atualiza a UI em tempo real
        onUpdate(JSON.parse(chunk));
    }
}

export async function sendUniqueMessage(context, onUpdate){
    const data = {
        model: "AlfaCopilot",
        prompt: context,
        stream: true
    };
    
    const response = await fetch(uniqueMessageURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        console.log(chunk)
        // Atualiza a UI em tempo real
        onUpdate(JSON.parse(chunk));
    }
}