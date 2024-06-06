CREATE DATABASE alwaysmusic;

create table estudiantes(
id serial primary key,
nombre varchar(100) not null,
rut varchar(50) not null unique,
curso varchar(50) not null,
nivel int not null);