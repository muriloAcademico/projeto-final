const API_URL =
    "https://projeto-final-devweb.onrender.com";

// Tipos disponíveis localmente em assets/types/
const TIPOS_DISPONIVEIS = [
    "bug", "dark", "dragon", "electric", "fairy",
    "fighting", "fire", "flying", "ghost", "grass",
    "ground", "ice", "normal", "poison", "psychic",
    "rock", "steel", "water"
];

function getTypeIcon(tipo) {

    if (!tipo || !TIPOS_DISPONIVEIS.includes(tipo)) {
        return "./assets/types/normal.png";
    }

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
    ataque2,
    tipo_ataque1,
    tipo_ataque2
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
                        ataque2,

                        tipo_ataque1,
                        tipo_ataque2

                    })
                }
            );

        const dados =
            await resposta.json();

        if (!resposta.ok) {

            alert(
                dados.mensagem
            );

            return;

        }

        alert(
            dados.mensagem
        );

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

    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const pokemon =
            time[i];

        if (pokemon) {

            lista.innerHTML += `
                <div class="time-slot">
 
                    <div class="time-header">
 
                        <span class="pokemon-name">
                            ${pokemon.nome}
                        </span>
 
                        <div class="header-info">
 
                            <span class="hp">
                                HP ${pokemon.hp}
                            </span>
 
                            <img
                                src="${getTypeIcon(pokemon.tipo1)}"
                                class="type-icon"
                                alt="${pokemon.tipo1 || 'normal'}"
                                title="${pokemon.tipo1 || 'normal'}"
                                onerror="this.src='./assets/types/normal.png'"
                            >
 
                            ${pokemon.tipo2
                    ?
                    `
                                <img
                                    src="${getTypeIcon(pokemon.tipo2)}"
                                    class="type-icon"
                                    alt="${pokemon.tipo2}"
                                    title="${pokemon.tipo2}"
                                    onerror="this.src='./assets/types/normal.png'"
                                >
                                `
                    :
                    ""
                }
 
                        </div>
 
                    </div>
 
                    <img
                        src="${pokemon.imagem}"
                        class="pokemon-img"
                        alt="${pokemon.nome}"
                    >
 
                    <div class="attack">
 
                        <img
                            src="${getTypeIcon(pokemon.tipo_ataque1)}"
                            class="attack-icon"
                            alt="${pokemon.tipo_ataque1 || 'normal'}"
                            title="${pokemon.tipo_ataque1 || 'normal'}"
                            onerror="this.src='./assets/types/normal.png'"
                        >
 
                        <span>
                            ${pokemon.ataque1 || "—"}
                        </span>
 
                    </div>
 
                    <div class="attack">
 
                        <img
                            src="${getTypeIcon(pokemon.tipo_ataque2)}"
                            class="attack-icon"
                            alt="${pokemon.tipo_ataque2 || 'normal'}"
                            title="${pokemon.tipo_ataque2 || 'normal'}"
                            onerror="this.src='./assets/types/normal.png'"
                        >
 
                        <span>
                            ${pokemon.ataque2 || "—"}
                        </span>
 
                    </div>
 
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
            `;

        } else {

            lista.innerHTML += `
                <div class="time-slot vazio">
 
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