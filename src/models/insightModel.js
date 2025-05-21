var database = require("../database/config");

function buscarInsightPorUsuario(usuarioId) {
  var instrucaoSql = `
    SELECT 
      ins.id AS insight_id,
      ins.tipo,
      ins.nota,
      fils.id AS filme_id,
      fils.titulo,
      fils.ano_De_Lancamento,
      fils.categoria,
      fils.tempo_de_duracao

    FROM insight ins
    JOIN filmes_series fils ON ins.fkfilmes_series = fils.id
    WHERE ins.fkuser = ${usuarioId};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function inserirNotaPessoal(idUsuario, idFilme, nota) { // avaliação de filmes pelo user
  const instrucaoSql = `
    INSERT INTO insight (fkuser, fkfilmes_series, tipo, nota)
    VALUES (${idUsuario}, ${idFilme}, 'pessoal', ${nota});
  `;
  console.log("Executando SQL:", instrucaoSql);
  return database.executar(instrucaoSql);
}


function buscarNotasPessoaisPorUsuario(idUsuario) { // função para buscar os calculos no banco
  const instrucaoSql = `
    SELECT f.titulo, i.nota
    FROM insight i
    JOIN filmes_series f ON i.fkfilmes_series = f.id
    WHERE i.fkuser = ${idUsuario} AND i.tipo = 'pessoal';
  `;
  return database.executar(instrucaoSql);
}



module.exports = {
  buscarInsightPorUsuario,
  buscarNotasPessoaisPorUsuario,
  inserirNotaPessoal
}
