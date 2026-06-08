CREATE DATABASE poketracker;

USE poketracker;

CREATE TABLE favoritos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokemon_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    imagem VARCHAR(255)
);