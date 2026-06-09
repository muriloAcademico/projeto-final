const connection =
    require("../database/connection");

exports.listar = (req, res) => {

    connection.query(
        "SELECT * FROM equipe",
        (erro, resultados) => {

            if (erro)
                return res.status(500)
                    .json(erro);

            res.json(resultados);
        }
    );
};

exports.salvar = (req, res) => {

    const {
        pokemon_id,
        nome,
        imagem
    } = req.body;

    connection.query(
        `
        SELECT *
        FROM equipe
        WHERE pokemon_id = ?
        `,
        [pokemon_id],
        (erro, resultado) => {

            if (erro)
                return res.status(500)
                    .json(erro);

            if (resultado.length > 0) {

                return res.status(400)
                    .json({
                        mensagem:
                            "Este Pokémon já está no time."
                    });

            }

            connection.query(
                `
                SELECT *
                FROM equipe
                `,
                (erro, timeAtual) => {

                    if (erro)
                        return res.status(500)
                            .json(erro);

                    if (timeAtual.length >= 6) {

                        return res.status(400)
                            .json({
                                mensagem:
                                    "Seu time já possui 6 Pokémon."
                            });

                    }

                    connection.query(
                        `
                        INSERT INTO equipe
                        (pokemon_id,nome,imagem)
                        VALUES (?,?,?)
                        `,
                        [
                            pokemon_id,
                            nome,
                            imagem
                        ],
                        (erro) => {

                            if (erro)
                                return res.status(500)
                                    .json(erro);

                            res.json({
                                mensagem:
                                    "Pokémon adicionado ao time!"
                            });

                        }
                    );

                }
            );

        }
    );
};

exports.remover = (req, res) => {

    const id = req.params.id;

    connection.query(
        `
        DELETE FROM equipe
        WHERE id = ?
        `,
        [id],
        (erro) => {

            if (erro)
                return res.status(500)
                    .json(erro);

            res.json({
                mensagem:
                    "Pokémon removido do time."
            });

        }
    );
};