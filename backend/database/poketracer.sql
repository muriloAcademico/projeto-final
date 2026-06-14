USE railway;

CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokemon_id INT UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    imagem VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pokemon_id INT UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    imagem VARCHAR(255),
    hp INT,
    tipo1 VARCHAR(50),
    tipo2 VARCHAR(50),
    ataque1 VARCHAR(100),
    ataque2 VARCHAR(100),
    tipo_ataque1 VARCHAR(50),
    tipo_ataque2 VARCHAR(50),
    dano_ataque1 INT DEFAULT 0,
	dano_ataque2 INT DEFAULT 0
);

DESCRIBE equipe;