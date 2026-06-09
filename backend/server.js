const express = require("express");
const cors = require("cors");

const favoritosRoutes = require("./routes/favoritosRoutes");
const equipeRoutes = require("./routes/equipeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/favoritos", favoritosRoutes);
app.use("/equipe", equipeRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "API funcionando"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});