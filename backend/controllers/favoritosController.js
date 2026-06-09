const connection =
    require("../database/connection");

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