var database = require("../database/config");

function inserirNotaPessoal(fkuser, fkfilmes_series, nota,) { // avaliação de filmes pelo user
  var instrucaoSql = `
    INSERT INTO insight (fkuser, fkfilmes_series, nota)
    VALUES (${fkuser}, ${fkfilmes_series}, ${nota});
  `;

  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarMediaPoster(posterId) {
  var instrucaoSql = `
  SELECT ROUND(AVG(nota), 1) AS media FROM insight WHERE fkfilmes_series = ${posterId};
  `;

  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function verificarPosterListar(idUsuario, posterId) {
  var instrucaoSql = `
  SELECT fkuser, fkfilmes_series FROM insight where fkuser = ${idUsuario} AND fkfilmes_series = ${posterId}`;

  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMediaEmTodosOsPoster() {
   var instrucaoSql = `
  SELECT fkfilmes_series AS posterId, ROUND(AVG(nota), 1) AS media FROM insight GROUP BY fkfilmes_series;
`
  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql).catch(erro => {
    console.error("Erro ao executar SQL:", erro);
    throw erro});
}

module.exports = {
  inserirNotaPessoal,
  listarMediaPoster,
  verificarPosterListar,
  buscarMediaEmTodosOsPoster,
}
