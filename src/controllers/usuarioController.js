var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {

    usuarioModel.autenticar(email, senha)
      .then(
        function (resultadoAutenticar) {
          console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
          console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

          if (resultadoAutenticar.length == 1) {
            console.log(resultadoAutenticar);

            usuarioModel.verificarEmailExistente(email, senha)
              .then((resultadoAquarios) => {
                if (resultadoAquarios.length > 0) {
                  res.json({
                    id: resultadoAutenticar[0].id,
                    email: resultadoAutenticar[0].email,
                    nome: resultadoAutenticar[0].nome,
                    senha: resultadoAutenticar[0].senha,
                    apelido: resultadoAutenticar[0].apelido,
                  });
                } else {
                  res.status(204).json({ apelido: [] });
                }
              })
          } else if (resultadoAutenticar.length == 0) {
            res.status(403).send("Email ou senha inválido(s)");
          } else {
            res.status(403).send("Mais de um usuário com o mesmo login!");
          }
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}


function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var apelido = req.body.apelidoServer;
  var senha = req.body.senhaServer;

  // Faça as validações dos valores | da pra simplificar
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (apelido == undefined) {
    res.status(400).send("Seu apelido está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {

    usuarioModel.verificarEmailExistente(email, apelido)
      .then(usuarios => {
        let mensagem = "";

        if (usuarios.length > 0) {
          for (i = 0; i < usuarios.length; i++) {
            const user = usuarios[i];

            if (usuarios.email === email && !mensagem.includes('Email já Cadastrado')) {
              mensagem += "Email já cadastrado. ";
            }


            if (usuarios.apelido === apelido && !mensagem.includes("Apelido já cadastrado")) {
              mensagem += "Apelido já cadastrado. ";
            }
          }
          return res.status(409).send(mensagem);

        }
        return usuarioModel.cadastrar(nome, apelido, email, senha);
      })
      .then(resultado => {
        if (resultado) {
          res.status(201).json(resultado);
        } else {
          res.status(500).send("Erro ao cadastrar o usuário.");
        }
      })
      .catch(erro => {
        console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  autenticar,
  cadastrar,
}