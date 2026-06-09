const API_URL =
    "https://projeto-final-devweb.onrender.com";

function getTypeIcon(tipo) {
    return `./assets/types/${tipo}.png`;
}

async function adicionarAoTime(
    pokemon_id,
    nome,
    imagem,
    hp,
    tipo1,
    tipo2,
    ataque1,
    ataque2
) {

    try {

        const resposta =
            await fetch(
                `${API_URL}/equipe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        pokemon_id,
                        nome,
                        imagem,
                        hp,
                        tipo1,
                        tipo2,
                        ataque1,
                        ataque2
                    })
                }
            );

        const dados =
            await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;

        }

        await carregarTime();

    } catch (erro) {

        console.error(erro);

    }

}

async function carregarTime() {

    const resposta =
        await fetch(
            `${API_URL}/equipe`
        );

    const time =
        await resposta.json();

    const lista =
        document.getElementById(
            "listaTime"
        );

    lista.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        const pokemon = time[i];

        if (pokemon) {

            lista.innerHTML += `
                <div class="time-slot">

                    <div class="time-header">

                        <span class="pokemon-name">
                            ${pokemon.nome}
                        </span>

                        <span>
                        HP ${pokemon.hp}
                        </span>

                    </div>

                    <img
                        src="${pokemon.imagem}"
                        class="pokemon-img"
                    >

                    <div class="tipos">

                        <span class="tipo">
                            ${pokemon.tipo1}
                        </span>

                        ${
                            pokemon.tipo2
                            ?
                            `<span class="tipo">
                                ${pokemon.tipo2}
                            </span>`
                            :
                            ""
                        }

                    </div>

                        <p>
                            ⚔ ${pokemon.ataque1}
                        </p>

                        <p>
                            ⚔ ${pokemon.ataque2}
                        </p>

                        <div class="acoes">

                            <button
                                onclick="
                                favoritarPokemon(
                                    ${pokemon.pokemon_id},
                                    '${pokemon.nome}',
                                    '${pokemon.imagem}'
                                )"
                            >
                                ⭐ Favoritar
                            </button>

                            <button
                                onclick="
                                removerDoTime(
                                    ${pokemon.id}
                                )"
                            >
                                🗑 Remover
                            </button>
                        </div>
                    </div>
                </div>
            `;

        } else {

            lista.innerHTML += `
                <div class="time-slot">

                    <p>
                        Slot vazio
                    </p>

                </div>
            `;

        }

    }

}

async function removerDoTime(id) {

    await fetch(
        `${API_URL}/equipe/${id}`,
        {
            method: "DELETE"
        }
    );

    await carregarTime();

}