const express =
    require("express");

const router =
    express.Router();

const controller =
    require(
        "../controllers/favoritosController"
    );

router.get(
    "/",
    controller.listar
);

router.post(
    "/",
    controller.salvar
);

module.exports = router;