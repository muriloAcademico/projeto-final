# Documentação da pasta assets

Este diretório contém imagens utilizadas pela aplicação PokeTracker: papel de parede
da Pokédex e ícones de tipo usados nos cards e no time.

Conteúdo principal
- `wallpaper.jfif` — imagem de fundo usada na página (fundo da Pokédex).
- `types/` — pasta com ícones de tipo (ex.: `fire.png`, `water.png`, `ghost.png`).

Links úteis
- Ícones de tipo (coleção): https://archives.bulbagarden.net/wiki/Category:Type_icons
- Imagem da Pokédex (Pinterest): https://pt.pinterest.com/pin/153896512262639223/e
- Pesquisa de wallpaper (Pinterest): https://www.pinterest.com/search/pins/?q=wallpaper%20pokemon%20gameboy

Como usar
- O JavaScript espera que os ícones de tipo estejam em `assets/types/` e que o
  nome do arquivo corresponda ao nome do tipo em inglês (ex.: `water.png`).
- Exemplo de uso em `js/equipe.js`: a função `getTypeIcon(tipo)` monta o caminho
  `./assets/types/${tipo.toLowerCase()}.png` para exibir o ícone.

Boas práticas
- Ao adicionar novos ícones, prefira imagens PNG com fundo transparente e nomes
  em letras minúsculas sem espaços (use underscore `_` se necessário).
- Para obter ícones oficiais ou consistentes, consulte a coleção do Bulbapedia
  (link acima) e salve-os em `assets/types/`.

Licença e atribuição
- As imagens encontradas em sites externos (Bulbapedia, Pinterest) podem ter
  restrições de uso. Verifique a licença antes de redistribuir ou usar em projetos
  públicos.
