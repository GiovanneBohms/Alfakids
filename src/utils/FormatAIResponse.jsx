export function formatAIResponse(response){
    const lines = response.split("\n");

    return (
        <div>
            {lines.map((line, index) => {
                // Títulos em negrito **...**
                const titleMatch = line.match(/\*\*(.*?)\*\*/);
                if (titleMatch) {
                    return <h2 key={index}>{titleMatch[1]}</h2>;
                }

                // Listas não numeradas (* ...)
                if (line.startsWith("* ")) {
                    return <ul key={index}><li>{line.replace("* ", "")}</li></ul>;
                }

                // Listas numeradas (1., 2., ...)
                const orderedMatch = line.match(/^(\d+)\. (.*)/);
                console.log(orderedMatch)
                if (orderedMatch) {
                    return <ol start={orderedMatch[1]} key={index}><li>{orderedMatch[2]}</li></ol>;
                }

                // Texto normal
                return <p key={index}>{line}</p>;
            })}
        </div>
    );
}