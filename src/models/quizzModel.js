var database = require("../database/config");

function listarQuestoes() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ")

    var instrucaoSql = `
       SELECT
    qp.pergunta AS questao,
    GROUP_CONCAT(pg.texto ORDER BY pg.valor) AS alternativas,
    GROUP_CONCAT(pg.valor ORDER BY pg.valor) AS pontos
    FROM quiz_perguntas qp
    JOIN alternativas pg ON qp.id = pg.fkquiz_perguntas
    GROUP BY qp.id, qp.pergunta;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarQuestoes
};