var quizzModel = require("../models/quizzModel");

// function inserirDadosQuizz(req, res) {
//     const dadosQuizz = req.body.resultadoQuizz;

//     const idUsuario = req.body.idUsuario;
//     // const idDaPergunta = dadosQuizz.map(pergunta => pergunta.idDaPergunta);
//     // const pontuacao = dadosQuizz.map(pontos => pontos.pontuacao);


//     if (!idUsuario || !idDaPergunta || !pontuacao) {
//         return res.status(400).send("Campos obrigatorios faltando!");
//     }

//     quizzModel.inserirDadosQuizz(idUsuario, dadosQuizz)
//         .then(resultado => {
//             if (resultado) {
//                 res.status(201).json(resultado);
//             } else {
//                 res.status(500).send("Erro ao cadastrar o usuário.");
//             }
//         })
//         .catch(erro => {
//             if (erro.status) {
//                 res.status(erro.status).send(erro.message);
//             } else {
//                 console.error("Erro ao inserir nota:", erro);
//                 res.status(500).json(erro.sqlMessage || erro.message);
//             }
//         });
// }

    function listarQuestoes(req, res) {
        quizzModel.listarQuestoes()
        .then(listaQuestoes => {
            if (listaQuestoes && listaQuestoes.length > 0) {
                res.status(200).json(listaQuestoes);
            } else {
                res.status(400).send("Erro ao listar as questões no Banco.");
            }
        })
        .catch(erro => {
            console.error('Erro ao achar questões', erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        })
    }

module.exports = {
    listarQuestoes
};