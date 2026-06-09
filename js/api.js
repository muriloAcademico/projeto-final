const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
 
async function buscarPokemonApi(nome) {
 
    const resposta = await fetch(
        `${POKE_API}${String(nome).toLowerCase()}`
    );
 
    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado");
    }
 
    return await resposta.json();
}
 
// Retorna tipo E poder do ataque
async function buscarDadosAtaque(nomeAtaque) {
 
    try {
 
        if (!nomeAtaque || nomeAtaque === "Sem ataque") {
            return { tipo: "normal", poder: 0 };
        }
 
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/move/${nomeAtaque}`
        );
 
        if (!resposta.ok) {
            return { tipo: "normal", poder: 0 };
        }
 
        const dados = await resposta.json();
 
        return {
            tipo:  dados?.type?.name  || "normal",
            poder: dados?.power       || 0
        };
 
    } catch (erro) {
 
        console.warn(`Erro ao buscar ataque "${nomeAtaque}":`, erro);
        return { tipo: "normal", poder: 0 };
 
    }
 
}