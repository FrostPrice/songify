-- Inserting sample data into usuario (user) table
INSERT INTO usuario (nome, idade, preferencia_musical, email, senha)
VALUES (
        'John Doe',
        25,
        'Rock',
        'john.doe@example.com',
        'password123'
    ),
    (
        'Jane Smith',
        30,
        'Pop',
        'jane.smith@example.com',
        'pass456'
    ),
    (
        'Bob Johnson',
        22,
        'Hip Hop',
        'bob.johnson@example.com',
        'secure789'
    );
-- Inserting sample data into artista (artist) table
INSERT INTO artista (nome, idade, id_genero)
VALUES ('The Beatles', 60, 1),
    -- Assuming Rock genre has id 1
    ('Taylor Swift', 32, 2),
    -- Assuming Pop genre has id 2
    ('Kendrick Lamar', 34, 3);
-- Assuming Hip Hop genre has id 3
-- Inserting sample data into genero (genre) table
INSERT INTO genero (nome)
VALUES ('Rock'),
    ('Pop'),
    ('Hip Hop');
-- Inserting sample data into album table
INSERT INTO album (nome, imagem_capa, duracao)
VALUES ('Abbey Road', NULL, 45.5),
    ('1989', NULL, 40.2),
    ('To Pimp a Butterfly', NULL, 55.8);
-- Inserting sample data into musica (music) table
INSERT INTO musica (nome, duracao, data_lancamento, id_album)
VALUES ('Come Together', 3.45, '1969-09-26', 1),
    ('Shake It Off', 4.02, '2014-08-18', 2),
    ('Alright', 5.30, '2015-03-15', 3);
--
-- Inserting in relationship tables
-- Inserting sample data into usuario_recomendacao (user-recommendation) table
INSERT INTO usuario_recomendacao (id_usuario, id_recomendacao)
VALUES (1, 1),
    -- User John Doe is recommended with recommendation ID 1
    (2, 2),
    -- User Jane Smith is recommended with recommendation ID 2
    (3, 3);
-- User Bob Johnson is recommended with recommendation ID 3
-- Inserting sample data into recomendacao_artista (recommendation-artist) table
INSERT INTO recomendacao_artista (id_recomendacao, id_artista)
VALUES (1, 1),
    -- Recommendation ID 1 is associated with artist ID 1 (The Beatles)
    (2, 2),
    -- Recommendation ID 2 is associated with artist ID 2 (Taylor Swift)
    (3, 3);
-- Recommendation ID 3 is associated with artist ID 3 (Kendrick Lamar)
-- Inserting sample data into recomendacao_musica (recommendation-music) table
INSERT INTO recomendacao_musica (id_recomendacao, id_musica)
VALUES (1, 1),
    -- Recommendation ID 1 is associated with music ID 1 (Come Together)
    (2, 2),
    -- Recommendation ID 2 is associated with music ID 2 (Shake It Off)
    (3, 3);
-- Recommendation ID 3 is associated with music ID 3 (Alright)
-- Inserting sample data into genero_musica (genre-music) table
INSERT INTO genero_musica (id_genero, id_musica)
VALUES (1, 1),
    -- Rock genre is associated with music ID 1 (Come Together)
    (2, 2),
    -- Pop genre is associated with music ID 2 (Shake It Off)
    (3, 3);
-- Hip Hop genre is associated with music ID 3 (Alright)
-- Inserting sample data into genero_artista (genre-artist) table
INSERT INTO genero_artista (id_genero, id_artista)
VALUES (1, 1),
    -- Rock genre is associated with artist ID 1 (The Beatles)
    (2, 2),
    -- Pop genre is associated with artist ID 2 (Taylor Swift)
    (3, 3);
-- Hip Hop genre is associated with artist ID 3 (Kendrick Lamar)
-- Inserting sample data into album_artista (album-artist) table
INSERT INTO album_artista (id_album, id_artista)
VALUES (1, 1),
    -- Album ID 1 (Abbey Road) is associated with artist ID 1 (The Beatles)
    (2, 2),
    -- Album ID 2 (1989) is associated with artist ID 2 (Taylor Swift)
    (3, 3);
-- Album ID 3 (To Pimp a Butterfly) is associated with artist ID 3 (Kendrick Lamar)