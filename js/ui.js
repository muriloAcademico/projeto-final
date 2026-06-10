/*
    ui.js
    Responsável por renderizar o card do Pokémon na interface,
    registrar eventos de favoritar e adicionar ao time,
    e selecionar os melhores ataques.
*/
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

                const melhoresAtaques =
                    await selecionarMelhoresAtaques(pokemon.moves, pokemon.types);

                const ataque1 = melhoresAtaques[0]?.nome || "Sem ataque";
                const ataque2 = melhoresAtaques[1]?.nome || "Sem ataque";
                const tipoAtaque1 = melhoresAtaques[0]?.tipo || "normal";
                const tipoAtaque2 = melhoresAtaques[1]?.tipo || "normal";
                const danoAtaque1 = melhoresAtaques[0]?.poder || 0;
                const danoAtaque2 = melhoresAtaques[1]?.poder || 0;

                console.log("=== MELHORES ATAQUES ===");
                console.log(`${ataque1} | tipo: ${tipoAtaque1} | poder: ${danoAtaque1} | score: ${melhoresAtaques[0]?.score}`);
                console.log(`${ataque2} | tipo: ${tipoAtaque2} | poder: ${danoAtaque2} | score: ${melhoresAtaques[1]?.score}`);

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

// Busca dados de todos os ataques e retorna os 2 melhores
// com base nos tipos do pokémon e maior precisaoFinal
async function selecionarMelhoresAtaques(moves, tipos) {

    const tipo1 = tipos[0]?.type.name || null;
    const tipo2 = tipos[1]?.type.name || null;

    const dadosTodos = await Promise.all(
        moves.map(m =>
            buscarDadosAtaque(m.move.name)
                .then(dados => ({
                    nome: m.move.name,
                    tipo: dados.tipo,
                    poder: dados.poder,
                    precisao: dados.precisao,
                    pp: dados.pp,
                    score: calcularScore(
                        dados.poder,
                        dados.precisao,
                        dados.pp
                    )
                }))
        )
    );

    // Ordena todos por score decrescente
    const ordenados = [...dadosTodos]
        .filter(a => a.score > 0)
        .sort((a, b) => b.score - a.score);

    let ataque1 = null;
    let ataque2 = null;

    if (tipo1 && tipo2) {

        // Dois tipos: um ataque de cada tipo, o melhor de cada
        ataque1 = ordenados.find(a => a.tipo === tipo1) || null;
        ataque2 = ordenados.find(a => a.tipo === tipo2) || null;

        // Fallback: se não achou para algum tipo, pega o melhor disponível
        if (!ataque1 && !ataque2) {
            [ataque1, ataque2] = ordenados.slice(0, 2);
        } else if (!ataque1) {
            ataque1 = ordenados.find(a => a !== ataque2) || ataque2;
        } else if (!ataque2) {
            ataque2 = ordenados.find(a => a !== ataque1) || ataque1;
        }

    } else {

        // Um tipo: ataque1 do tipo do pokémon, ataque2 qualquer
        ataque1 = ordenados.find(a => a.tipo === tipo1) || ordenados[0] || null;
        ataque2 = ordenados.find(a => a !== ataque1) || ordenados[1] || null;

    }

    return [
        ataque1 || dadosTodos[0],
        ataque2 || dadosTodos[1]
    ];

}