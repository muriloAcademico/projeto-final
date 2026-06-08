const connection =
    require("../database/connection");

exports.listar = (req, res) => {

    connection.query(
        "SELECT * FROM favoritos",
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
        INSERT INTO favoritos
        (pokemon_id,nome,imagem)
        VALUES (?,?,?)
        `,
        [pokemon_id, nome, imagem],
        (erro) => {

            if (erro)
                return res.status(500)
                .json(erro);

            res.json({
                mensagem:
                "Favorito salvo"
            });
        }
    );
};