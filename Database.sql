create database restaurante;
use database restaurante;

create table persona (
     idpersona SERIAL PRIMARY KEY,
     usuario varchar(20) not null,
     contrasenia varchar(25) not null,
     email text not null,
     rol varchar(20) not null
);

create table reserva (
     idreserva SERIAL PRIMARY KEY,
     fecha date not null,
     estado varchar(25) not null,
     mesa int not null,
     fkpersona int not null
);

create table plato (
     idplato SERIAL PRIMARY KEY,
     nombreplato varchar(20) not null,
     descripcionplato text not null,
     precio int not null,
     imagen BYTEA not null
);

 alter table reserva
  add constraint fkpersona_reserva
  foreign key (fkpersona)
  references persona (idpersona);

ALTER TABLE reserva ADD COLUMN mesa integer not null;
ALTER TABLE reserva ADD COLUMN fkpersona integer not null;
alter table reserva add column (mesa integer(5));
  INSERT INTO persona (usuario, contrasenia, email, rol) VALUES ('superadmin', '1234', 'superadmin@gmail.com', 'superadministrador');
  INSERT INTO reserva(fecha, estado, mesa, fkpersona) VALUES('10/10/10', 'DISP',1, 10);