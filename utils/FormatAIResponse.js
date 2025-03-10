export function formatAIResponse(elementId){
    const classPlanDiv = document.getElementById(elementId);
    let text = classPlanDiv.textContent || "";

    let titleParts = text.split(/\*\*(.*?)\*\*/g);

    classPlanDiv.innerText = "";

    titleParts.forEach((part, index) => {
        if (index % 2 === 1) {
            let title = document.createElement("h2")
            title.textContent = part
            classPlanDiv.appendChild(title)
        } else {
            classPlanDiv.appendChild(document.createTextNode(part))
        }
    });
}