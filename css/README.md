# Documentação da pasta css

Este diretório contém o estilo visual do projeto PokeTracker.

## Arquivo principal

- `style.css`
  - Define o layout geral da página, o estilo da Pokédex, o card do Pokémon,
    o layout da equipe e a lista de favoritos.

## Estrutura e seletores principais

- Seletores globais
  - `*`: remove margens e espaçamentos padrões, aplica `box-sizing: border-box`.
  - `body`: define fonte, plano de fundo fixo e imagem de papel de parede.

- Estrutura geral
  - `.container`: container central com largura máxima, espaçamento e layout flex.
  - `.pokedex-wrapper`: centraliza a área da Pokédex.
  - `.pokedex-bg`: define o fundo da Pokédex, posição relativa e tamanho.

- Card do Pokémon
  - `#pokemonCard`: área branca interna da Pokédex onde o Pokémon é renderizado.
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

## Observações

- As imagens de tipo são carregadas dinamicamente pelo JavaScript a partir de
  `./assets/types/`.
- O layout foi pensado para reproduzir uma Pokédex estilizada com controles
  posicionados sobre o fundo da Pokédex.
