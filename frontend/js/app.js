document
    .getElementById("buscarBtn")
    .addEventListener(
        "click",
        buscarPokemon
    );

async function buscarPokemon() {

    try {

        const nome =
            document
            .getElementById("pokemonInput")
            .value;

        const pokemon =
            await buscarPokemonApi(nome);

        mostrarPokemon(pokemon);

    } catch (erro) {

        alert(
            "Pokémon não encontrado"
        );

    }
}

carregarFavoritos();