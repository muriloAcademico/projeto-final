async function favoritarPokemon(pokemon_id, nome, imagem) {
 
    const resposta = await fetch(
        "https://projeto-final-devweb.onrender.com/favoritos",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pokemon_id, nome, imagem })
        }
    );
 
    const dados = await resposta.json();
    alert(dados.mensagem);
    await carregarFavoritos();
}
 
async function carregarFavoritos() {
 
    const resposta = await fetch(
        "https://projeto-final-devweb.onrender.com/favoritos"
    );
 
    const favoritos = await resposta.json();
 
    const lista = document.getElementById("listaFavoritos");
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
 
            <button onclick="adicionarAoTimePorFavorito(${pokemon.pokemon_id})">
                ➕ Time
            </button>
 
            <button onclick="removerFavorito(${pokemon.id})">
                🗑 Remover
            </button>
 
        </div>
        `;
    });
}
 
async function adicionarAoTimePorFavorito(pokemon_id) {
 
    try {
 
        const pokemon = await buscarPokemonApi(pokemon_id);
 
        const hpStat = pokemon.stats.find(s => s.stat.name === "hp");
        const hp = hpStat ? hpStat.base_stat : 0;
 
        const melhoresAtaques =
            await selecionarMelhoresAtaques(pokemon.moves);
 
        const ataque1     = melhoresAtaques[0]?.nome     || "Sem ataque";
        const ataque2     = melhoresAtaques[1]?.nome     || "Sem ataque";
        const tipoAtaque1 = melhoresAtaques[0]?.tipo     || "normal";
        const tipoAtaque2 = melhoresAtaques[1]?.tipo     || "normal";
        const danoAtaque1 = melhoresAtaques[0]?.poder    || 0;
        const danoAtaque2 = melhoresAtaques[1]?.poder    || 0;
 
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
}
 
async function removerFavorito(id) {
 
    await fetch(
        `https://projeto-final-devweb.onrender.com/favoritos/${id}`,
        { method: "DELETE" }
    );
 
    await carregarFavoritos();
}