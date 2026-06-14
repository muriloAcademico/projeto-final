# PokeTracker

## Visão geral do projeto

PokeTracker é uma aplicação web que permite buscar Pokémons, favoritar e montar
um time de até 6 Pokémons. A interface combina:

- `index.html`: markup principal da aplicação.
- `css/style.css`: estilo visual da Pokédex, cards de Pokémon, time e favoritos.
- `js/`: scripts que fazem a comunicação com APIs, atualizam a interface e
  gerenciam o status do time e dos favoritos.
- `backend/`: servidor, rotas e banco de dados para persistência de equipe e
  favoritos.

## Documentação incluída

Este README consolida a documentação do projeto, incluindo o conteúdo do
`js/README.md` e a documentação da pasta `css`.

---

## Documentação do `js/`

Este diretório contém os scripts JavaScript responsáveis pelo funcionamento do
aplicativo PokeTracker.

### Estrutura dos arquivos

- `api.js`
  - Comunicação com a API externa do Pokémon (`PokeAPI`).
  - Funções:
    - `buscarPokemonApi(nome)`: busca dados de um Pokémon por nome ou ID.
    - `buscarDadosAtaque(nomeAtaque)`: busca dados de um ataque e retorna tipo,
      poder, precisão e PP.
    - `calcularScore(poder, precisao, pp)`: calcula um score para ordenar
      ataques.

- `ui.js`
  - Atualiza o HTML da interface e exibe o card do Pokémon buscado.
  - Funções:
    - `mostrarPokemon(pokemon)`: monta o card do Pokémon e registra ações de
      favoritar/adicionar ao time.
    - `selecionarMelhoresAtaques(moves, tipos)`: escolhe os dois melhores ataques
      para o time.

- `favoritos.js`
  - Lida com a lista de favoritos do usuário usando o backend remoto.
  - Funções:
    - `favoritarPokemon(pokemon_id, nome, imagem)`: envia uma requisição para
      favoritar um Pokémon.
    - `carregarFavoritos()`: busca e exibe a lista de favoritos.
    - `adicionarAoTimePorFavorito(pokemon_id)`: adiciona ao time um Pokémon da
      lista de favoritos.
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

### Ordem de carregamento

No `index.html`, os scripts são carregados na seguinte ordem:

1. `api.js`
2. `ui.js`
3. `favoritos.js`
4. `equipe.js`
5. `app.js`

Essa ordem garante que as funções globais estejam disponíveis para os
módulos subsequentes.

---

## Documentação da pasta `css`

Este diretório contém o estilo visual do projeto PokeTracker.

### Arquivo principal

- `style.css`
  - Define o layout geral da página, o estilo da Pokédex, o card do Pokémon,
    o layout da equipe e a lista de favoritos.

### Estrutura e seletores principais

- Seletores globais
  - `*`: remove margens e espaçamentos padrões, aplica `box-sizing: border-box`.
  - `body`: define fonte, plano de fundo fixo e imagem de papel de parede.

- Estrutura geral
  - `.container`: container central com largura máxima, espaçamento e layout
    flex.
  - `.pokedex-wrapper`: centraliza a área da Pokédex.
  - `.pokedex-bg`: define o fundo da Pokédex, posição relativa e tamanho.

- Card do Pokémon
  - `#pokemonCard`: área branca interna da Pokédex onde o Pokémon é
    renderizado.
  - `#pokemonCard img`: define tamanho da imagem do Pokémon.
  - `#pokemonCard h2`, `#pokemonCard p`, `#pokemonCard button`: estilo de texto,
    botões e espaçamento.

- Busca de Pokémon
  - `.pokedex-input`: campo de texto posicionado sobre a Pokédex.
  - `.pokedex-input::placeholder`: estilo do placeholder.
  - `.pokedex-btn`: botão de busca posicionado sobre a Pokédex.

- Seções de time e favoritos
  - `#timePokemon`, `#favoritos`: cartões brancos com bordas arredondadas,
    padding e sombra suave.
  - `#listaFavoritos`: layout flexível para cards de favoritos.
  - `.favorito-card button`: estilo dos botões dentro dos favoritos.

- Time de Pokémons
  - `#listaTime`: grid de três colunas para os slots do time.
  - `.time-slot`: estilo dos slots de time vazios ou ocupados.
  - `.time-header`: cabeçalho do slot com nome, HP e ícones de tipo.
  - `.pokemon-img`: imagem do Pokémon no card de time.
  - `.attack`: linha de ataque com ícone, nome e dano.
  - `.acoes`: botões para favoritar ou remover do time.

### Observações

- As imagens de tipo são carregadas dinamicamente pelo JavaScript a partir de
  `./assets/types/`.
- O layout foi pensado para reproduzir uma Pokédex estilizada com controles
  posicionados sobre o fundo da Pokédex.

---

## Documentação adicional

- `index.html`: contém a marcação principal da interface, incluindo os IDs
  `pokemonCard`, `pokemonInput`, `buscarBtn`, `listaTime` e `listaFavoritos`.
- `assets/`: contém imagens usadas no fundo da Pokédex e nos ícones de tipo.
  Veja [assets/README.md](assets/README.md) para detalhes sobre as imagens e
  ícones de tipo.
- `backend/`: servidor e rotas para persistência de dados de favoritos e time.
  Veja [backend/README.md](backend/README.md) para documentação da API, variáveis
  de ambiente e instruções de execução.
- `backend/database/`: configuração de banco de dados e scripts de criação de
  tabelas.

## Documentação da pasta `backend/controllers`

Este diretório contém os controladores responsáveis pelas rotas de equipe e
favoritos.

- `backend/controllers/equipeController.js`
  - Lista todos os pokémons do time (`listar`).
  - Adiciona um pokémon ao time (`salvar`) com validação de duplicidade e limite
    de 6 pokémons.
  - Remove um pokémon do time (`remover`).

- `backend/controllers/favoritosController.js`
  - Lista todos os favoritos (`listar`).
  - Adiciona um pokémon aos favoritos (`salvar`) com validação de duplicidade.
  - Remove um favorito (`remover`).

Ambos usam a conexão com o banco em `backend/database/connection.js`.

---

## Documentação da pasta `backend/database`

Este diretório contém a configuração de conexão com o banco e o schema SQL.

- `backend/database/connection.js`
  - Exporta um pool MySQL com as variáveis de ambiente:
    `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
  - Usado pelos controladores para executar consultas SQL.

- `backend/database/poketracer.sql`
  - Script de criação de tabelas:
    - `favoritos`: armazena favoritos com `pokemon_id` único.
    - `equipe`: armazena o time com `pokemon_id` único e atributos de ataques.

A configuração do banco deve ser criada antes de rodar o backend.

---

## Documentação da pasta `backend/routes`

Este diretório define as rotas públicas da API.

- `backend/routes/equipeRoutes.js`
  - Rota base: `/equipe`
  - Métodos:
    - `GET /`: lista os Pokémons do time.
    - `POST /`: adiciona um Pokémon ao time.
    - `DELETE /:id`: remove um Pokémon do time.

- `backend/routes/favoritosRoutes.js`
  - Rota base: `/favoritos`
  - Métodos:
    - `GET /`: lista os Pokémons favoritos.
    - `POST /`: adiciona um Pokémon aos favoritos.
    - `DELETE /:id`: remove um favorito.

As rotas delegam a lógica para os controllers em `backend/controllers/`.

---

## Documentação de `backend/server.js`

- `backend/server.js` configura o servidor Express.
- Importa e monta os roteadores:
  - `/favoritos` → `backend/routes/favoritosRoutes.js`
  - `/equipe` → `backend/routes/equipeRoutes.js`
- Habilita CORS e JSON no corpo das requisições.
- Define a rota de saúde `/` que retorna `{ status: "API funcionando" }`.
- Inicia o servidor na porta definida por `process.env.PORT` ou `3000`.
