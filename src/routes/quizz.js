var express = require("express");
var router = express.Router();

var quizzController = require("../controllers/quizzController");

router.post("/inserir", function (req, res) {
    quizzController.inserirDadosQuizz(req, res);
});

router.get("/listar", function (req, res) {
    quizzController.listarResultadoQuizz(req, res);
});

router.get("/listarQuestoes", function (req, res) {
    quizzController.listarQuestoes(req, res);
});

module.exports = router;