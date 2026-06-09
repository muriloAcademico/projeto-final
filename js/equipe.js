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

    time.forEach(pokemon => {

        lista.innerHTML += `
            <div class="time-card">

                <img
                    src="${pokemon.imagem}"
                    width="80"
                >

                <p>
                    ${pokemon.nome}
                </p>

                <button
                    onclick="
                    removerDoTime(
                        ${pokemon.id}
                    )">
                    Remover
                </button>

            </div>
        `;

    });

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