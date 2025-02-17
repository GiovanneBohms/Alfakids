const modelURL = "http://localhost:11434/api/generate"

export async function sendMessage(message, onUpdate) {
    const data = {
        model: "AlfaCopilot",
        prompt: message,
        stream: true
    };

    const response = await fetch(modelURL, {
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

        // Atualiza a UI em tempo real
        onUpdate(JSON.parse(chunk));
    }
}