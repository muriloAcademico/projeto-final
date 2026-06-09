async function favoritarPokemon(
    pokemon_id,
    nome,
    imagem
) {

    const resposta = await fetch(
        "https://projeto-final-devweb.onrender.com/favoritos",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pokemon_id,
                nome,
                imagem
            })
        }
    );

    const dados = await resposta.json();

    alert(dados.mensagem);

    await carregarFavoritos();
}

async function carregarFavoritos() {

    const resposta =
        await fetch(
            "https://projeto-final-devweb.onrender.com/favoritos"
        );

    const favoritos =
        await resposta.json();

    const lista =
        document.getElementById(
            "listaFavoritos"
        );
    lista.innerHTML = "";

    favoritos.forEach(pokemon => {

        lista.innerHTML += `
        <div class="favorito-card">
 
            <img
                src="${pokemon.imagem}"
                alt="${pokemon.nome}"
                width="80"
            >
 
            <p>${pokemon.nome}</p>
 
            <button
                onclick="adicionarAoTimePorFavorito(
                    ${pokemon.pokemon_id}
                )"
            >
                ➕ Time
            </button>
 
            <button
                onclick="removerFavorito(
                    ${pokemon.id}
                )"
            >
                🗑 Remover
            </button>
 
        </div>
        `;
    });
}

// Busca os dados completos na PokeAPI antes de adicionar ao time
async function adicionarAoTimePorFavorito(pokemon_id) {

    try {

        // Busca os dados completos do pokémon na API
        const pokemon = await buscarPokemonApi(pokemon_id);

        const hpStat = pokemon.stats.find(
            s => s.stat.name === "hp"
        );
        const hp = hpStat ? hpStat.base_stat : 0;

        const ataque1 =
            pokemon.moves[0]?.move.name || "Sem ataque";

        const ataque2 =
            pokemon.moves[1]?.move.name || "Sem ataque";

        let tipoAtaque1 = pokemon.types[0].type.name;
        let tipoAtaque2 = pokemon.types[0].type.name;

        if (pokemon.moves[0]) {
            tipoAtaque1 = await buscarTipoAtaque(ataque1);
        }

        if (pokemon.moves[1]) {
            tipoAtaque2 = await buscarTipoAtaque(ataque2);
        }

        await adicionarAoTime(
            pokemon.id,
            pokemon.name,
            pokemon.sprites.front_default,
            hp,
            pokemon.types[0]?.type.name,
            pokemon.types[1]?.type.name || "",
            ataque1,
            ataque2,
            tipoAtaque1,
            tipoAtaque2
        );

    } catch (erro) {

        console.error(erro);
        alert("Erro ao adicionar Pokémon ao time.");

    }
}

async function removerFavorito(id) {

    await fetch(
        `https://projeto-final-devweb.onrender.com/favoritos/${id}`,
        {
            method: "DELETE"
        }
    );

    await carregarFavoritos();

}