async function mostrarPokemon(pokemon) {

    const card =
        document.getElementById(
            "pokemonCard"
        );

    card.innerHTML = `
        <h2>
            ${pokemon.name}
        </h2>

        <img
            src="${pokemon.sprites.front_default}"
            alt="${pokemon.name}"
        >

        <p>
            Tipo:
            ${pokemon.types
            .map(
                tipo =>
                    tipo.type.name
            )
            .join(", ")}
        </p>

        <p>
            HP:
            ${pokemon.stats[0].base_stat}
        </p>

        <button
            id="btnFavoritar"
        >
            ⭐ Favoritar
        </button>

        <button
            id="btnTime"
        >
            ➕ Adicionar ao Time
        </button>
    `;

    document
        .getElementById(
            "btnFavoritar"
        )
        .addEventListener(
            "click",
            () => {

                favoritarPokemon(
                    pokemon.id,
                    pokemon.name,
                    pokemon.sprites.front_default
                );

            }
        );

    document
        .getElementById(
            "btnTime"
        )
        .addEventListener(
            "click",
            async () => {

                try {

                    const ataque1 =
                        pokemon.moves[0]?.move.name ||
                        "Sem ataque";

                    const ataque2 =
                        pokemon.moves[1]?.move.name ||
                        "Sem ataque";

                    let tipoAtaque1 =
                        pokemon.types[0]
                            .type.name;

                    let tipoAtaque2 =
                        pokemon.types[0]
                            .type.name;

                    if (
                        pokemon.moves[0]
                    ) {

                        tipoAtaque1 =
                            await buscarTipoAtaque(
                                ataque1
                            );

                    }

                    if (
                        pokemon.moves[1]
                    ) {

                        tipoAtaque2 =
                            await buscarTipoAtaque(
                                ataque2
                            );

                    }
                    
                    adicionarAoTime(

                        pokemon.id,

                        pokemon.name,

                        pokemon.sprites.front_default,

                        pokemon.stats[0]
                            .base_stat,

                        pokemon.types[0]
                            ?.type.name,

                        pokemon.types[1]
                            ?.type.name || "",

                        ataque1,
                        ataque2,
                        tipoAtaque1,
                        tipoAtaque2
                    );

                } catch (erro) {

                    console.error(
                        erro
                    );

                    alert(
                        "Erro ao adicionar Pokémon ao time."
                    );

                }

            }
        );

}