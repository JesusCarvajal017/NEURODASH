CREATE TABLE usuario (
	user_Id BIGINT NOT NULL UNIQUE,
	user_name VARCHAR() NOT NULL UNIQUE,
	user_email VARCHAR NOT NULL UNIQUE,
	user_avatar VARCHAR NOT NULL DEFAULT 'img_system.png',
	user_exp BIGINT NULL,
	rgo_id INTEGER NULL,
	tp_user_id INTEGER NOT NULL,
	PRIMARY KEY(user_Id)
);


CREATE TABLE login (
	loginId INTEGER NOT NULL UNIQUE,
	usuarioId INTEGER NOT NULL,
	password VARCHAR NOT NULL,
	PRIMARY KEY(loginId)
);


CREATE TABLE configUsuario (
	config_Id INTEGER NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	config_sonido CHAR(3) NOT NULL,
	config_musica CHAR(3) NOT NULL,
	PRIMARY KEY(config_Id)
);


CREATE TABLE rangos (
	rgo_Id INTEGER NOT NULL UNIQUE,
	rgo_nombre VARCHAR NOT NULL,
	rgo_expTope BIGINT NOT NULL,
	rgo_img VARCHAR NOT NULL,
	rgo_multiplicador DECIMAL NOT NULL,
	PRIMARY KEY(rgo_Id)
);


CREATE TABLE niveles (
	nvel_Id INTEGER NOT NULL UNIQUE,
	nvel_nombre VARCHAR NOT NULL,
	PRIMARY KEY(nvel_Id)
);


CREATE TABLE modoJuego (
	mdo_juegoId INTEGER NOT NULL UNIQUE,
	mdo_nombre VARCHAR NOT NULL,
	PRIMARY KEY(mdo_juegoId)
);


CREATE TABLE tipoUsuario (
	tp_user_Id INTEGER NOT NULL UNIQUE,
	tp_user_name VARCHAR NOT NULL,
	PRIMARY KEY(tp_user_Id)
);


CREATE TABLE salasPrivadas (
	sla_privadaId INTEGER NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	sla_token BIGINT NOT NULL,
	sla_estado INTEGER NOT NULL,
	PRIMARY KEY(sla_privadaId)
);


CREATE TABLE configSala (
	cfg_salaId INTEGER NOT NULL UNIQUE,
	cfg_cantidadJugadores SMALLINT NOT NULL,
	mdo_id INTEGER NOT NULL,
	sla_privadaId INTEGER NOT NULL,
	dfi_id INTEGER NOT NULL,
	PRIMARY KEY(cfg_salaId)
);


CREATE TABLE dificultadEntrenamiento (
	dfi_id INTEGER NOT NULL UNIQUE,
	mdo_juegoId INTEGER NOT NULL,
	nvel_id INTEGER NOT NULL,
	dfi_tiempoVista BIGINT NOT NULL,
	dfi_tiempoRespuesta BIGINT NOT NULL,
	dfi_cantidadElemento BIGINT NOT NULL,
	dfi_rodas BIGINT NOT NULL,
	PRIMARY KEY(dfi_id)
);


CREATE TABLE salaJugadores (
	sla_jug_id INTEGER NOT NULL UNIQUE,
	sla_privadaId INTEGER,
	user_id INTEGER,
	PRIMARY KEY(sla_jug_id)
);


CREATE TABLE notificaciones (
	nf_id INTEGER NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	nf_descripcion VARCHAR NOT NULL,
	PRIMARY KEY(nf_id)
);


ALTER TABLE dificultadEntrenamiento
ADD FOREIGN KEY(mdo_juegoId) REFERENCES modoJuego(mdo_juegoId)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE dificultadEntrenamiento
ADD FOREIGN KEY(nvel_id) REFERENCES niveles(nvel_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE configUsuario
ADD FOREIGN KEY(user_id) REFERENCES usuario(user_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE usuario
ADD FOREIGN KEY(rgo_id) REFERENCES rangos(rgo_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE salasPrivadas
ADD FOREIGN KEY(user_id) REFERENCES usuario(user_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE login
ADD FOREIGN KEY(usuarioId) REFERENCES usuario(user_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE configSala
ADD FOREIGN KEY(sla_privadaId) REFERENCES salasPrivadas(sla_privadaId)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE configSala
ADD FOREIGN KEY(dfi_id) REFERENCES dificultadEntrenamiento(dfi_id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE configSala
ADD FOREIGN KEY(mdo_id) REFERENCES modoJuego(mdo_juegoId)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE salaJugadores
ADD FOREIGN KEY(sla_privadaId) REFERENCES salasPrivadas(sla_privadaId)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE usuario
ADD FOREIGN KEY(tp_user_id) REFERENCES tipoUsuario(tp_user_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE salaJugadores
ADD FOREIGN KEY(user_id) REFERENCES usuario(user_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE notificaciones
ADD FOREIGN KEY(user_id) REFERENCES usuario(user_Id)
ON UPDATE NO ACTION ON DELETE NO ACTION;