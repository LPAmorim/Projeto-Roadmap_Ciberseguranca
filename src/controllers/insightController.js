var insightModel = require("../models/insightModel");

function buscarInsightPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  insightModel.buscarInsightPorUsuario(idUsuario)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]); // sem dados
      }
    })
    .catch(function (erro) {
      console.log("Erro ao buscar insights:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function inserirNota(req, res) {
  const { idUsuario, idFilme, nota } = req.body;

  if (!idUsuario || !idFilme || nota == null) {
    return res.status(400).send("Campos obrigatórios faltando!");
  }

  insightModel.inserirNotaPessoal(idUsuario, idFilme, nota)
    .then(() => {
      res.status(201).send("Nota inserida com sucesso.");
    })
    .catch((erro) => {
      console.error("Erro ao inserir nota:", erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

module.exports = {
  buscarInsightPorUsuario,
  inserirNota
};
