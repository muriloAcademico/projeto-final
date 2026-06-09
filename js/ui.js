async function mostrarPokemon(pokemon) {
 
    const card =
        document.getElementById("pokemonCard");
 
    const hpStat = pokemon.stats.find(
        s => s.stat.name === "hp"
    );
    const hp = hpStat ? hpStat.base_stat : 0;
 
    card.innerHTML = `
        <h2>${pokemon.name}</h2>
 
        <img
            src="${pokemon.sprites.front_default}"
            alt="${pokemon.name}"
        >
 
        <p>
            Tipo:
            ${pokemon.types.map(t => t.type.name).join(", ")}
        </p>
 
        <p>HP: ${hp}</p>
 
        <button id="btnFavoritar">⭐ Favoritar</button>
        <button id="btnTime">➕ Adicionar ao Time</button>
    `;
 
    document
        .getElementById("btnFavoritar")
        .addEventListener("click", () => {
            favoritarPokemon(
                pokemon.id,
                pokemon.name,
                pokemon.sprites.front_default
            );
        });
 
    document
        .getElementById("btnTime")
        .addEventListener("click", async () => {
 
            try {
 
                // Busca dados de TODOS os ataques em paralelo (mais rápido)
                const dadosTodosAtaques = await Promise.all(
                    pokemon.moves.map(m =>
                        buscarDadosAtaque(m.move.name)
                            .then(dados => ({
                                nome:  m.move.name,
                                tipo:  dados.tipo,
                                poder: dados.poder
                            }))
                    )
                );
 
                // Ordena pelo poder e pega os 2 maiores
                const ataqueOrdenados = dadosTodosAtaques
                    .filter(a => a.poder > 0)
                    .sort((a, b) => b.poder - a.poder);
 
                // Se não houver ataques com poder, usa os primeiros
                const melhoresAtaques =
                    ataqueOrdenados.length >= 2
                        ? ataqueOrdenados.slice(0, 2)
                        : dadosTodosAtaques.slice(0, 2);
 
                const ataque1 = melhoresAtaques[0]?.nome  || "Sem ataque";
                const ataque2 = melhoresAtaques[1]?.nome  || "Sem ataque";
                const tipoAtaque1 = melhoresAtaques[0]?.tipo  || "normal";
                const tipoAtaque2 = melhoresAtaques[1]?.tipo  || "normal";
                const danoAtaque1 = melhoresAtaques[0]?.poder || 0;
                const danoAtaque2 = melhoresAtaques[1]?.poder || 0;
 
                console.log("=== MELHORES ATAQUES ===");
                console.log(`${ataque1} | tipo: ${tipoAtaque1} | poder: ${danoAtaque1}`);
                console.log(`${ataque2} | tipo: ${tipoAtaque2} | poder: ${danoAtaque2}`);
 
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
                    tipoAtaque2,
                    danoAtaque1,
                    danoAtaque2
                );
 
            } catch (erro) {
 
                console.error(erro);
                alert("Erro ao adicionar Pokémon ao time.");
 
            }
 
        });
 
}