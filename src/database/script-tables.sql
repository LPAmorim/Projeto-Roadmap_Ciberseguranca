create database roadmap_cyber;
use roadmap_cyber;

create table users (
    id int primary key auto_increment,
    nome varchar(50),
    apelido varchar(12) unique,
    email varchar(50) unique,
    senha varchar(50) not null
);

create table filmes_series (
    id int primary key auto_increment,
    titulo varchar(50),
    ano_De_Lancamento year,
    categoria varchar(30),
    tempo_de_duracao int -- min
);

create table insigth (
    id int primary key auto_increment,
    fkapelido int,
    fkfilmes_series int,
    nota decimal(1,1) 
);

insert into filmes_series (titulo, ano_De_Lancamento, categoria, tempo_de_duracao) values
('Hacker: Todo Crime tem um Início', 2016,'Suspense', 95),
('Mr. Robot', 2015,'Engenharia Social e Hacker', 2.540),
('Snowden', 2016, 'Baseados em Fatos Reais', 135),
('Invasores – Nenhum Sistema Está a Salvo', 2014,'Ficção eTecnológic', 102 ),
('Matrix', 1999,'Ficção Científica', 136),
('O Jogo da Imitação', 2014,'Baseados em Fatos Reais', 114),
('Black Mirror', 2011, 'Ficção Científica', 1733),
('Hacker', 2015, 'Ação e Suspense', 133);


select * from filmes_series;
drop DATABASE roadmap_cyber;
