document
    .getElementById("buscarBtn")
    .addEventListener(
        "click",
        buscarPokemon
    );
    
document
    .getElementById("pokemonInput")
    .addEventListener("input", () => {

        const valor = document
            .getElementById("pokemonInput")
            .value.trim();

        if (valor === "") {
            document.getElementById("pokemonCard").innerHTML = "";
        }

    });

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
carregarTime();