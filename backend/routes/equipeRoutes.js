/*
    equipeRoutes.js
    Define as rotas da API para o recurso 'equipe'.
    Encaminha as requisições para o controller responsável.
*/
const express =
    require("express");

const router =
    express.Router();

const controller =
    require(
        "../controllers/equipeController"
    );

router.get(
    "/",
    controller.listar
);

router.post(
    "/",
    controller.salvar
);

router.delete(
    "/:id",
    controller.remover
);

module.exports = router;