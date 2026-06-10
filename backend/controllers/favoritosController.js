/*
    favoritosController.js
    Controlador dos favoritos do usuário.
    Responsável por listar, salvar e remover Pokémons favoritos.
*/
const connection =
    require("../database/connection");

// Retorna todos os Pokémons marcados como favoritos.
exports.listar = async (req, res) => {

    try {

        const [resultados] =
            await connection.query(
                "SELECT * FROM favoritos"
            );

        res.json(resultados);

    } catch (erro) {

        res.status(500).json(erro);

    }

};

// Adiciona um Pokémon aos favoritos, evitando duplicatas de pokemon_id.
exports.salvar = async (req, res) => {

    try {

        const {
            pokemon_id,
            nome,
            imagem
        } = req.body;

        const [existe] =
            await connection.query(
                `
                SELECT *
                FROM favoritos
                WHERE pokemon_id = ?
                `,
                [pokemon_id]
            );

        if (existe.length > 0) {

            return res.status(400).json({
                mensagem:
                    "Este Pokémon já está nos favoritos."
            });

        }

        await connection.query(
            `
            INSERT INTO favoritos
            (pokemon_id,nome,imagem)
            VALUES (?,?,?)
            `,
            [
                pokemon_id,
                nome,
                imagem
            ]
        );

        res.json({
            mensagem:
                "Favorito salvo com sucesso!"
        });

    } catch (erro) {

        res.status(500).json(erro);

    }

};

// Remove um favorito pelo ID do registro.
exports.remover = async (req, res) => {

    try {

        const id = req.params.id;

        await connection.query(
            `
            DELETE FROM favoritos
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensagem:
            "Favorito removido."
        });

    } catch (erro) {

        res.status(500).json(erro);

    }

};