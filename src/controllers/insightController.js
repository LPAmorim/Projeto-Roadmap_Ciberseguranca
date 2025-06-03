var insightModel = require("../models/insightModel");

function buscarInsightPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  insightModel.buscarInsightPorUsuario(idUsuario)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json(['sem dados']);
      }
    })
    .catch(function (erro) {
      console.log("Erro ao buscar insights:", erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function inserirNota(req, res) {
  const { idUsuario, notaUser, posterId } = req.body;

  if (!idUsuario || !posterId || notaUser == null) {
    return res.status(400).send("Campos obrigatórios faltando!");
  }

  insightModel.inserirNotaPessoal(idUsuario, posterId, notaUser)
    .then(() => {
      res.status(201).send("Nota inserida com sucesso.");
    })
    .catch((erro) => {
      console.error("Erro ao inserir nota:", erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

function listaMediaPorPoster(req, res) {
  const posterId = req.query.posterId;

  if (!posterId) {
    return res.status(400).send("Campos obrigatórios faltando!");
  }

  insightModel.listarMediaPoster(posterId).then((resultado) => {
    if (resultado.length > 0) { // if só uma verificação padrão 
      res.status(200).json(resultado[0].media); // Retorna a média
    
    } else {
      res.status(404).send("Poster não encontrado ou sem avaliações.");
    }
  })
    .catch((erro) => {
      console.log(`Erro ao achar ${posterId}`, erro);
      res.status(500).json(erro.sqlMessage || erro.message);
    });
}

module.exports = {
  buscarInsightPorUsuario,
  inserirNota,
  listaMediaPorPoster
};
