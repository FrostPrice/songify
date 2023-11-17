CREATE SCHEMA IF NOT EXISTS catalogo_musica;
USE catalogo_musica;
--
-- Criando tabelas entidade
CREATE TABLE IF NOT EXISTS usuario(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    idade INTEGER NOT NULL,
    preferencia_musical VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS artista(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50),
    idade INTEGER NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_genero) REFERENCES genero(id)
);
CREATE TABLE IF NOT EXISTS album(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    imagem_capa BLOB,
    duracao FLOAT NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS musica(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    duracao FLOAT NOT NULL,
    data_lancamento DATE NOT NULL,
    id_album INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_album) REFERENCES album(id)
);
CREATE TABLE IF NOT EXISTS recomendacao(
    id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(50) NOT NULL,
    id_musica INT NOT NULL,
    id_artista INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_musica) REFERENCES musica(id),
    FOREIGN KEY(id_artista) REFERENCES artista(id)
);
CREATE TABLE IF NOT EXISTS genero(
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);
--
-- Criando tabelas relacionamento
CREATE TABLE IF NOT EXISTS usuario_recomendacao(
    id INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_recomendacao INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_recomendacao) REFERENCES recomendacao(id)
);
CREATE TABLE IF NOT EXISTS recomendacao_artista(
    id INT NOT NULL AUTO_INCREMENT,
    id_recomendacao INT NOT NULL,
    id_artista INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_recomendacao) REFERENCES recomendacao(id),
    FOREIGN KEY(id_artista) REFERENCES artista(id)
);
CREATE TABLE IF NOT EXISTS recomendacao_musica(
    id INT NOT NULL AUTO_INCREMENT,
    id_recomendacao INT NOT NULL,
    id_musica INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_recomendacao) REFERENCES recomendacao(id),
    FOREIGN KEY(id_musica) REFERENCES musica(id)
);
CREATE TABLE IF NOT EXISTS genero_musica(
    id INT NOT NULL AUTO_INCREMENT,
    id_genero INT NOT NULL,
    id_musica INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_genero) REFERENCES genero(id),
    FOREIGN KEY(id_musica) REFERENCES musica(id)
);
CREATE TABLE IF NOT EXISTS genero_artista(
    id INT NOT NULL AUTO_INCREMENT,
    id_genero INT NOT NULL,
    id_artista INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_genero) REFERENCES genero(id),
    FOREIGN KEY(id_artista) REFERENCES artista(id)
);
CREATE TABLE IF NOT EXISTS album_artista(
    id INT NOT NULL AUTO_INCREMENT,
    id_album INT NOT NULL,
    id_artista INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_album) REFERENCES album(id),
    FOREIGN KEY(id_artista) REFERENCES artista(id)
);