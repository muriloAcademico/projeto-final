const connection =
    require("../database/connection");

exports.listar = async (req, res) => {

    try {

        const [resultados] =
            await connection.query(
                "SELECT * FROM equipe"
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
            imagem,
            hp,
            tipo1,
            tipo2,
            ataque1,
            ataque2
        } = req.body;

        const [existe] =
            await connection.query(
                `
                SELECT *
                FROM equipe
                WHERE pokemon_id = ?
                `,
                [pokemon_id]
            );

        if (existe.length > 0) {

            return res.status(400).json({
                mensagem:
                    "Este Pokémon já está no time."
            });

        }

        const [timeAtual] =
            await connection.query(
                `
                SELECT *
                FROM equipe
                `
            );

        if (timeAtual.length >= 6) {

            return res.status(400).json({
                mensagem:
                    "Seu time já possui 6 Pokémon."
            });

        }

        await connection.query(
            `
            INSERT INTO equipe
            (
                pokemon_id,
                nome,
                imagem,
                hp,
                tipo1,
                tipo2,
                ataque1,
                ataque2
            )
            VALUES (?,?,?,?,?,?,?,?)
            `,
            [
                pokemon_id,
                nome,
                imagem,
                hp,
                tipo1,
                tipo2,
                ataque1,
                ataque2
            ]
        );

        res.json({
            mensagem:
                "Pokémon adicionado ao time!"
        });

    } catch (erro) {

        res.status(500).json(erro);

    }

};

exports.remover = async (req, res) => {

    try {

        const id =
            req.params.id;

        await connection.query(
            `
            DELETE FROM equipe
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensagem:
                "Pokémon removido do time."
        });

    } catch (erro) {

        res.status(500).json(erro);

    }

};