/*
    equipeController.js
    Controlador da equipe do usuário.
    Responsável por listar, adicionar e remover Pokémons do time.
*/
const connection =
    require("../database/connection");
 
// Retorna todos os Pokémons atualmente salvos na equipe.
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
 
// Adiciona um Pokémon ao time, validando duplicidade e limite de 6 membros.
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
            ataque2,
            tipo_ataque1,
            tipo_ataque2,
            dano_ataque1,
            dano_ataque2
        } = req.body;
 
        const [existe] =
            await connection.query(
                `SELECT * FROM equipe WHERE pokemon_id = ?`,
                [pokemon_id]
            );
 
        if (existe.length > 0) {
            return res.status(400).json({
                mensagem: "Este Pokémon já está no time."
            });
        }
 
        const [timeAtual] =
            await connection.query(
                `SELECT * FROM equipe`
            );
 
        if (timeAtual.length >= 6) {
            return res.status(400).json({
                mensagem: "Seu time já possui 6 Pokémon."
            });
        }
 
        await connection.query(
            `
            INSERT INTO equipe
            (
                pokemon_id, nome, imagem,
                hp, tipo1, tipo2,
                ataque1, ataque2,
                tipo_ataque1, tipo_ataque2,
                dano_ataque1, dano_ataque2
            )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
            `,
            [
                pokemon_id, nome, imagem,
                hp, tipo1, tipo2,
                ataque1, ataque2,
                tipo_ataque1, tipo_ataque2,
                dano_ataque1, dano_ataque2
            ]
        );
 
        res.json({ mensagem: "Pokémon adicionado ao time!" });
 
    } catch (erro) {
 
        res.status(500).json(erro);
 
    }
 
};
 
// Remove um Pokémon da equipe pelo ID do registro.
exports.remover = async (req, res) => {
 
    try {
 
        const id = req.params.id;
 
        await connection.query(
            `DELETE FROM equipe WHERE id = ?`,
            [id]
        );
 
        res.json({ mensagem: "Pokémon removido do time." });
 
    } catch (erro) {
 
        res.status(500).json(erro);
 
    }
 
};