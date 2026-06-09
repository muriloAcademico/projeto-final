function mostrarPokemon(pokemon) {

    const card =
        document.getElementById("pokemonCard");

    card.innerHTML = `
        <h2>${pokemon.name}</h2>

        <img
            src="${pokemon.sprites.front_default}"
            alt="${pokemon.name}"
        >

        <p>
            Tipo:
            ${pokemon.types
            .map(tipo => tipo.type.name)
            .join(", ")}
        </p>

        <p>
            HP:
            ${pokemon.stats[0].base_stat}
        </p>

        <button onclick="favoritarPokemon(
            ${pokemon.id},
            '${pokemon.name}',
            '${pokemon.sprites.front_default}'
        )">
            ⭐ Favoritar
        </button>

        <button onclick="adicionarAoTime(
            ${pokemon.id},
            '${pokemon.name}',
            '${pokemon.sprites.front_default}',
            ${pokemon.stats[0].base_stat},
            '${pokemon.types[0]?.type.name}',
            '${pokemon.types[1]?.type.name || ""}',
            '${pokemon.moves[0]?.move.name || ""}',
            '${pokemon.moves[1]?.move.name || ""}'
        )">
            ➕ Time
        </button>
    `;
}