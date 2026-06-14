# Documentação da pasta backend

Resumo
Este diretório contém a API do PokeTracker — um backend Express que expõe
endpoints para gerenciar os favoritos e a equipe do usuário, persistindo dados
em um banco MySQL.

Arquivos principais
- `server.js`: configura o servidor Express, middlewares (CORS, JSON) e monta as
  rotas `/favoritos` e `/equipe`. Também expõe a rota de saúde `/`.
- `package.json`: descreve dependências (`express`, `cors`, `dotenv`, `mysql2`) e
  script `start` (`node server.js`).
- `routes/`:
  - `favoritosRoutes.js`: define `GET /`, `POST /` e `DELETE /:id` para favoritos.
  - `equipeRoutes.js`: define `GET /`, `POST /` e `DELETE /:id` para equipe.
- `controllers/`:
  - `favoritosController.js`: lógica para listar, salvar e remover favoritos.
  - `equipeController.js`: lógica para listar, salvar (valida duplicidade e
    limite de 6) e remover membros do time.
- `database/connection.js`: cria um pool MySQL usando `mysql2/promise` e lê as
  variáveis de ambiente via `dotenv`.
- `.env` (não comitada por padrão): armazena as variáveis de configuração do
  banco e porta do servidor (veja seção `Variáveis de ambiente`).

Endpoints
- `GET /` — rota de saúde, retorna `{ status: "API funcionando" }`.
- Recursos `favoritos` e `equipe`:
  - `GET /favoritos` — lista favoritos.
  - `POST /favoritos` — salva um favorito; corpo: `{ pokemon_id, nome, imagem }`.
  - `DELETE /favoritos/:id` — remove favorito pelo `id` do registro.
  - `GET /equipe` — lista os Pokémons do time.
  - `POST /equipe` — adiciona um Pokémon ao time; o controller valida que o
    `pokemon_id` não esteja duplicado e que o time não exceda 6 membros. Campos
    usados: `pokemon_id, nome, imagem, hp, tipo1, tipo2, ataque1, ataque2, tipo_ataque1, tipo_ataque2, dano_ataque1, dano_ataque2`.
  - `DELETE /equipe/:id` — remove um Pokémon do time pelo `id` do registro.

Variáveis de ambiente (exemplo)
- `DB_HOST` — host do MySQL
- `DB_PORT` — porta do MySQL
- `DB_USER` — usuário do banco
- `DB_PASSWORD` — senha do banco
- `DB_NAME` — nome do banco
- `PORT` — porta HTTP onde o servidor roda (padrão `3000`)

Execução local
1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na pasta `backend/` com as variáveis de ambiente
   (não commite este arquivo se contiver credenciais).

3. Inicie o servidor:

```bash
npm start
```

O servidor rodará na porta configurada em `PORT` ou `3000`.

Banco de dados
- O `database/poketracer.sql` contém o esquema/DDL usado pelo projeto. A
  conexão é feita via pool (`mysql2/promise`).

Observações
- As credenciais não devem ser comitadas no repositório. Use um arquivo
  `.env` local ou variáveis de ambiente no ambiente de produção.
- Os controllers retornam erros 500 em exceções e 400 para validações de negócio
  (ex.: duplicidade ou time completo).
