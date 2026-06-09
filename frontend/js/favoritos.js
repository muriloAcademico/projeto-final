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

        </div>
    `;

    });
}