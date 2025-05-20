var usuarioModel = require("../models/usuarioModel");
var insightModel  = require("../models/insightModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // da pra simplificar
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
                        const usuario = resultadoAutenticar[0];

                        insightModel.buscarInsightPorUsuario(usuario.id)
                            .then((resultadoinsight) => {
                                if (resultadoinsight.length > 0) {
                                    res.json({
                                        id: usuario.id,
                                        nome:usuario.nome,
                                        apelido:  usuario.apelido,
                                        email: usuario.email,
                                        insightsPessoal: resultadoinsight
                                    }); // retirei a senha
                                } else {
                                    res.status(204).json({ insights: [] });
                                }
                            })
                            .catch(
                                function (erro) {
                            console.log("Erro ao buscar insights:", erro);
                            res.status(500).json(erro.sqlMessage || erro.message);
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
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

function listar(req, res) {
    usuarioModel.listar().then((resultado) => {
        res.status(200).json(resultado);
    });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var apelido = req.body.apelidoServer;
    var email = req.body.emailServer;
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

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, apelido, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    listar
}