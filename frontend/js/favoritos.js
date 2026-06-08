async function favoritarPokemon(
    pokemon_id,
    nome,
    imagem
) {

    await fetch(
        "https://projeto-final-devweb.onrender.com/favoritos",
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

    carregarFavoritos();
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
            <p>${pokemon.nome}</p>
        `;

    });
}