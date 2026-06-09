const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
 
async function buscarPokemonApi(nome) {
 
    const resposta = await fetch(
        `${POKE_API}${String(nome).toLowerCase()}`
    );
 
    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado");
    }
 
    return await resposta.json();
}
 
// Retorna tipo, poder, precisão e PP do ataque
async function buscarDadosAtaque(nomeAtaque) {
 
    try {
 
        if (!nomeAtaque || nomeAtaque === "Sem ataque") {
            return { tipo: "normal", poder: 0, precisao: 0, pp: 0 };
        }
 
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/move/${nomeAtaque}`
        );
 
        if (!resposta.ok) {
            return { tipo: "normal", poder: 0, precisao: 0, pp: 0 };
        }
 
        const dados = await resposta.json();
 
        return {
            tipo:    dados?.type?.name || "normal",
            poder:   dados?.power      || 0,
            precisao: dados?.accuracy  || 0,
            pp:      dados?.pp         || 0
        };
 
    } catch (erro) {
 
        console.warn(`Erro ao buscar ataque "${nomeAtaque}":`, erro);
        return { tipo: "normal", poder: 0, precisao: 0, pp: 0 };
 
    }
 
}
 
// Calcula uma pontuação combinando poder, precisão e PP
// score = poder × (precisão / 100) × pp
// Ataques sem poder (status) ficam com score 0
function calcularScore(poder, precisao, pp) {
 
    if (!poder || poder === 0) return 0;
 
    const precisaoFinal = precisao > 0 ? precisao : 100;
 
    return poder * (precisaoFinal / 100) * pp;
 
}