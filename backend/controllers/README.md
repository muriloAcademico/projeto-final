# Documentação da pasta controllers

Este diretório contém os controladores do backend para gerenciar os recursos
`equipe` e `favoritos`.

## Arquivos

- `equipeController.js`
  - Controla a tabela `equipe` no banco de dados.
  - Exporta as funções:
    - `listar(req, res)`: busca e retorna todos os registros da equipe.
    - `salvar(req, res)`: adiciona um Pokémon ao time se não existir e se o time
      ainda tiver menos de 6 Pokémons.
    - `remover(req, res)`: remove um Pokémon do time pelo `id`.
  - Validações importantes:
    - não permite duplicatas de `pokemon_id` na equipe.
    - limita o time a 6 Pokémons.

- `favoritosController.js`
  - Controla a tabela `favoritos` no banco de dados.
  - Exporta as funções:
    - `listar(req, res)`: busca e retorna todos os favoritos.
    - `salvar(req, res)`: adiciona um Pokémon aos favoritos se não estiver
      favoritado ainda.
    - `remover(req, res)`: remove um favorito pelo `id`.
  - Validações importantes:
    - não permite duplicatas de `pokemon_id` nos favoritos.

## Dependências

Ambos os controladores usam a conexão com o banco de dados definida em:

- `backend/database/connection.js`

O módulo `connection` exporta uma instância configurada para executar consultas
SQL com `connection.query(...)`.
