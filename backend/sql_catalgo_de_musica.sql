CREATE SCHEMA IF NOT EXISTS catalogo_musica;
USE catalogo_musica;
--
-- Criando tabelas entidade
create table "Usuarios" (
    id serial primary key,
    nome varchar(50) not null unique,
    idade integer not null,
    preferencia_musical varchar(50),
    email varchar(50) not null unique,
    senha varchar(255) not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
create table "Artista" (
    id serial primary key,
    nome varchar(255) not null unique,
    idade integer not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
create table "Albums" (
    id serial primary key,
    nome varchar(50) not null,
    duracao double precision not null,
    data_lancamento timestamp with time zone not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
create table "Musicas" (
    id serial primary key,
    nome varchar(50) not null,
    duracao double precision not null,
    data_lancamento timestamp with time zone not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "AlbumId" integer references "Albums" on update cascade on delete
    set null
);
create table "Recomendacaos" (
    id serial primary key,
    nome varchar(50),
    tipo varchar(50),
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
create table "Generos" (
    id serial primary key,
    nome varchar(50) not null unique,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
create table "Permissoes" (
    id serial primary key,
    nome varchar(255) not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);
--
-- Criando tabelas relacionamento
create table usuario_recomendacaos (
    id serial primary key,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "UsuarioId" integer references "Usuarios" on update cascade on delete cascade,
    "RecomendacaoId" integer references "Recomendacaos" on update cascade on delete cascade,
    unique ("UsuarioId", "RecomendacaoId")
);
create table recomendacao_artista (
    id serial primary key,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "RecomendacaoId" integer references "Recomendacaos" on update cascade on delete cascade,
    "ArtistumId" integer references "Artista" on update cascade on delete cascade,
    unique ("RecomendacaoId", "ArtistumId")
);
create table recomendacao_musicas (
    id serial primary key,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "RecomendacaoId" integer references "Recomendacaos" on update cascade on delete cascade,
    "MusicaId" integer references "Musicas" on update cascade on delete cascade,
    unique ("RecomendacaoId", "MusicaId")
);
create table genero_musicas (
    id serial primary key,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "GeneroId" integer references "Generos" on update cascade on delete cascade,
    "MusicaId" integer references "Musicas" on update cascade on delete cascade,
    unique ("GeneroId", "MusicaId")
);
create table genero_artista (
    id serial primary key,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "GeneroId" integer references "Generos" on update cascade on delete cascade,
    "ArtistumId" integer references "Artista" on update cascade on delete cascade,
    unique ("GeneroId", "ArtistumId")
);
CREATE TABLE album_artista (
    id serial PRIMARY KEY,
    "createdAt" timestamp WITH TIME ZONE NOT NULL,
    "updatedAt" timestamp WITH TIME ZONE NOT NULL,
    "AlbumId" integer REFERENCES "Albums" ON UPDATE CASCADE ON DELETE CASCADE,
    "ArtistumId" integer REFERENCES "Artista" ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("AlbumId", "ArtistumId")
);
create table usuario_permissoes (
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "PermissoId" integer not null references "Permissoes" on update cascade on delete cascade,
    "UsuarioId" integer not null references "Usuarios" on update cascade on delete cascade,
    primary key ("PermissoId", "UsuarioId")
);