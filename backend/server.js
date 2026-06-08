const express =
    require("express");

const cors =
    require("cors");

const app =
    express();

app.use(cors());

app.use(express.json());

const favoritosRoutes =
    require(
        "./routes/favoritosRoutes"
    );

app.use(
    "/favoritos",
    favoritosRoutes
);

app.listen(
    3000,
    () => {
        console.log(
            "Servidor rodando"
        );
    }
);