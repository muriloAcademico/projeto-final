# Documentação da pasta assets/types

Esta pasta guarda ícones de tipo usados pela aplicação. Cada arquivo representa
um tipo de Pokémon e deve ser nomeado conforme o tipo em inglês, em letras
minúsculas. Exemplo: `fire.png`, `water.png`, `electric.png`.

Fonte recomendada
- Coleção de ícones de tipo (Bulbapedia): https://archives.bulbagarden.net/wiki/Category:Type_icons

Regras de nomenclatura
- Use somente letras minúsculas e, se necessário, underscore `_` para separar
  palavras (ex.: `ice.png`, `fairy.png`).
- Extensão preferida: `.png` com fundo transparente.

Integração com o projeto
- O arquivo JavaScript que carrega ícones espera encontrá-los em `assets/types/`
  e monta o caminho usando o nome do tipo (`tipo.toLowerCase()`).

Adição de novos ícones
1. Baixe o ícone desejado da fonte escolhida (verifique licença).
2. Nomeie o arquivo seguindo as regras acima.
3. Salve em `assets/types/`.
