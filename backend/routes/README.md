# Documentação da pasta routes

Este diretório define as rotas públicas da API do backend do PokeTracker.

## Arquivos

- `equipeRoutes.js`
  - Rota base: `/equipe`
  - Métodos:
    - `GET /`: lista os Pokémons do time.
    - `POST /`: adiciona um Pokémon ao time.
    - `DELETE /:id`: remove um Pokémon do time pelo ID do registro.
  - Encaminha as requisições para `backend/controllers/equipeController.js`.

- `favoritosRoutes.js`
  - Rota base: `/favoritos`
  - Métodos:
    - `GET /`: lista os Pokémons favoritos.
    - `POST /`: adiciona um Pokémon aos favoritos.
    - `DELETE /:id`: remove um favorito pelo ID do registro.
  - Encaminha as requisições para `backend/controllers/favoritosController.js`.

## Observações

- Os controladores executam a lógica de validação e persistência.
- O arquivo `backend/server.js` importa essas rotas e as monta no aplicativo Express.
