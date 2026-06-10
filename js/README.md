# Documentação da pasta js

Este diretório contém os scripts JavaScript responsáveis pelo funcionamento do aplicativo PokeTracker.

## Estrutura dos arquivos

- `api.js`
  - Comunicação com a API externa do Pokémon (`PokeAPI`).
  - Funções:
    - `buscarPokemonApi(nome)`: busca dados de um Pokémon por nome ou ID.
    - `buscarDadosAtaque(nomeAtaque)`: busca dados de um ataque e retorna tipo, poder, precisão e PP.
    - `calcularScore(poder, precisao, pp)`: calcula um score para ordenar ataques.

- `ui.js`
  - Atualiza o HTML da interface e exibe o card do Pokémon buscado.
  - Funções:
    - `mostrarPokemon(pokemon)`: monta o card do Pokémon e registra ações de favoritar/adicionar ao time.
    - `selecionarMelhoresAtaques(moves, tipos)`: escolhe os dois melhores ataques para o time.

- `favoritos.js`
  - Lida com a lista de favoritos do usuário usando o backend remoto.
  - Funções:
    - `favoritarPokemon(pokemon_id, nome, imagem)`: envia uma requisição para favoritar um Pokémon.
    - `carregarFavoritos()`: busca e exibe a lista de favoritos.
    - `adicionarAoTimePorFavorito(pokemon_id)`: adiciona ao time um Pokémon da lista de favoritos.
    - `removerFavorito(id)`: remove um favorito do backend.

- `equipe.js`
  - Gerencia a equipe do usuário e o card de cada slot de time.
  - Funções:
    - `getTypeIcon(tipo)`: retorna o caminho da imagem do tipo de Pokémon.
    - `adicionarAoTime(...)`: adiciona um Pokémon ao time pelo backend.
    - `carregarTime()`: busca a equipe atual e renderiza os slots.
    - `removerDoTime(id)`: remove um Pokémon do time.

- `app.js`
  - Inicializa a aplicação e liga eventos de busca e entrada.
  - Funções:
    - `buscarPokemon()`: lê o input, chama a API e renderiza o Pokémon.

## Ordem de carregamento

No `index.html`, os scripts são carregados na seguinte ordem:

1. `api.js`
2. `ui.js`
3. `favoritos.js`
4. `equipe.js`
5. `app.js`

Essa ordem garante que as funções globais estejam disponíveis para os módulos subsequentes.
