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

    const resposta =
        await fetch(
            `https://pokeapi.co/api/v2/move/${nomeAtaque}`
        );

    const dados =
        await resposta.json();

    return dados.type.name;

}