const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
 
async function buscarPokemonApi(nome) {
 
    const resposta = await fetch(
        `${POKE_API}${nome.toLowerCase()}`
    );
 
    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado");
    }
 
    return await resposta.json();
}
 
async function buscarTipoAtaque(nomeAtaque) {
 
    try {
 
        if (!nomeAtaque || nomeAtaque === "Sem ataque") {
            return "normal";
        }
 
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/move/${nomeAtaque}`
        );
 
        if (!resposta.ok) {
            return "normal";
        }
 
        const dados = await resposta.json();
 
        return dados?.type?.name || "normal";
 
    } catch (erro) {
 
        console.warn(`Não foi possível buscar tipo do ataque "${nomeAtaque}":`, erro);
        return "normal";
 
    }
 
}