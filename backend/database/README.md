# Documentação da pasta database

Este diretório contém a configuração de conexão com o banco de dados e o
esquema SQL utilizado pelo backend do PokeTracker.

## Arquivos

- `connection.js`
  - Exporta um pool de conexão MySQL usando `mysql2/promise`.
  - Lê as variáveis de ambiente definidas em `.env`:
    - `DB_HOST`
    - `DB_PORT`
    - `DB_USER`
    - `DB_PASSWORD`
    - `DB_NAME`
  - Usado pelos controladores para executar consultas SQL com
    `connection.query(...)`.

- `poketracer.sql`
  - Script SQL para criar as tabelas usadas pela aplicação.
  - Define as tabelas:
    - `favoritos`
      - colunas: `id`, `pokemon_id`, `nome`, `imagem`
      - `pokemon_id` é único para evitar duplicatas.
    - `equipe`
      - colunas: `id`, `pokemon_id`, `nome`, `imagem`, `hp`, `tipo1`, `tipo2`,
        `ataque1`, `ataque2`, `tipo_ataque1`, `tipo_ataque2`, `dano_ataque1`,
        `dano_ataque2`
      - `pokemon_id` é único e o time também é limitado a 6 inserções pela
        lógica do controlador em `backend/controllers/equipeController.js`.

## Utilização

1. Configure as variáveis de ambiente no arquivo `.env`.
2. Execute o script `poketracer.sql` em um banco MySQL para criar as tabelas.
3. Inicie o backend para que os controladores usem o pool de conexão.
