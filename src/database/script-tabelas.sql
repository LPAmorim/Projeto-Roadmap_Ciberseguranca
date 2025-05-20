CREATE DATABASE roadmap_cyber;
USE roadmap_cyber;

-- Tabela base de filmes/séries
CREATE TABLE filmes_series (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50),
    ano_De_Lancamento YEAR,
    categoria VARCHAR(30),
    tempo_de_duracao INT
);

-- Tabela de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    apelido VARCHAR(12) UNIQUE,
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(50) NOT NULL,
    insight_id INT,
    FOREIGN KEY (insight_id) REFERENCES insight(id)
);

-- Tabela de insights (gráficos pessoais e gerais)
CREATE TABLE insight (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkuser INT,
    fkfilmes_series INT,
    tipo ENUM('pessoal', 'geral'),
    nota DECIMAL(3,1), -- exemplo: 10.0
    FOREIGN KEY (fkuser) REFERENCES users(id),
    FOREIGN KEY (fkfilmes_series) REFERENCES filmes_series(id)
);

-- Questionários
CREATE TABLE questionario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao TEXT
);

-- Tentativas de usuários em questionários
CREATE TABLE tentativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    questionario_id INT,
    pontuacao INT,
    data_tentativa DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES users(id),
    FOREIGN KEY (questionario_id) REFERENCES questionario(id)
);

-- Perguntas dos questionários
CREATE TABLE perguntas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questionario_id INT,
    texto TEXT,
    pontuacao_correta INT,
    FOREIGN KEY (questionario_id) REFERENCES questionario(id)
);

-- Respostas que o usuário deu
CREATE TABLE respostasUser (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tentativa_id INT,
    pergunta_id INT,
    resposta_usuario TEXT,
    correta BOOLEAN,
    FOREIGN KEY (tentativa_id) REFERENCES tentativa(id),
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
);

INSERT INTO filmes_series (titulo, ano_De_Lancamento, categoria, tempo_de_duracao) VALUES
    ('Hacker: Todo Crime tem um Início', 2016, 'Suspense', 95),
    ('Mr. Robot', 2015, 'Engenharia Social e Hacker', 2540),
    ('Snowden', 2016, 'Baseados em Fatos Reais', 135),
    ('Invasores – Nenhum Sistema Está a Salvo', 2014, 'Ficção Tecnológica', 102),
    ('Matrix', 1999, 'Ficção Científica', 136),
    ('O Jogo da Imitação', 2014, 'Baseados em Fatos Reais', 114),
    ('Black Mirror', 2011, 'Ficção Científica', 1733),
    ('Hacker', 2015, 'Ação e Suspense', 133);
