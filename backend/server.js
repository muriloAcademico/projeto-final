/*
    server.js
    Configura e inicia o servidor Express do backend.
    Define middlewares, rotas e a porta de escuta.
*/
const express = require("express");
const cors = require("cors");

const favoritosRoutes = require("./routes/favoritosRoutes");
const equipeRoutes = require("./routes/equipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Monta as rotas da API para favoritos e equipe */
app.use("/favoritos", favoritosRoutes);
app.use("/equipe", equipeRoutes);

/* Rota de saúde da API */
app.get("/", (req, res) => {
    res.json({
        status: "API funcionando"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});