const API_URL =
    "https://projeto-final-devweb.onrender.com";

async function adicionarAoTime(
    pokemon_id,
    nome,
    imagem
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
                        imagem
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

                    <img
                        src="${pokemon.imagem}"
                        width="90"
                    >

                    <p>
                        ${pokemon.nome}
                    </p>

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