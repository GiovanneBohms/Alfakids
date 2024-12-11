
async function coletaInformacao(){

    const recebePromessa = await fetch("https://api.chucknorris.io/jokes/random");
    const converteJson = await recebePromessa.json()
    console.log(converteJson.value)
}

async function sincronizando() {
    await coletaInformacao()
    console.log("Teste")
}
// sincronizando()
// coletaInformacao()
// console.log("teste")
let numeros = [];
numeros.push(2);
numeros.push(3);
console.log(numeros)
