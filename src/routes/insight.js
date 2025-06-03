var express = require("express");
var router = express.Router();

var insightController = require("../controllers/insightController");

router.get("/:idUsuario",  function (req, res) {
  insightController.buscarInsightPorUsuario(req, res);
});

router.post("/inserir", function (req, res) {
  insightController.inserirNota(req, res);
});

router.get("/listar", function (req, res) {
  insightController.listaMediaPorPoster(req, res);
})
module.exports = router;