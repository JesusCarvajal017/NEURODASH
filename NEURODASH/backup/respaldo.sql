CREATE SCHEMA entrenamiento;

CREATE TABLE entrenamiento.dificultadentrenamiento (
    dfi_id integer NOT NULL,
    mdo_juegoid integer NOT NULL,
    nvel_id integer NOT NULL,
    dfi_tiempovista bigint NOT NULL,
    dfi_tiemporespuesta bigint NOT NULL,
    dfi_cantidadelemento bigint NOT NULL
);


CREATE TABLE entrenamiento.modojuego (
    mdo_juegoid integer NOT NULL,
    mdo_nombre character varying NOT NULL
);


CREATE TABLE entrenamiento.niveles (
    nvel_id integer NOT NULL,
    nvel_nombre character varying NOT NULL
);

ALTER TABLE ONLY entrenamiento.dificultadentrenamiento
  ADD CONSTRAINT dificultadentrenamiento_pkey PRIMARY KEY (dfi_id);

ALTER TABLE ONLY entrenamiento.modojuego
    ADD CONSTRAINT modojuego_pkey PRIMARY KEY (mdo_juegoid);


ALTER TABLE ONLY entrenamiento.niveles
    ADD CONSTRAINT niveles_pkey PRIMARY KEY (nvel_id);
	
ALTER TABLE ONLY entrenamiento.dificultadentrenamiento
    ADD CONSTRAINT dificultadentrenamiento_mdo_juegoid_fkey FOREIGN KEY (mdo_juegoid) REFERENCES entrenamiento.modojuego(mdo_juegoid);

ALTER TABLE ONLY entrenamiento.dificultadentrenamiento
    ADD CONSTRAINT dificultadentrenamiento_nvel_id_fkey FOREIGN KEY (nvel_id) REFERENCES entrenamiento.niveles(nvel_id);
	
INSERT INTO entrenamiento.niveles (nvel_id, nvel_nombre) VALUES (1, 'Facil');
INSERT INTO entrenamiento.niveles (nvel_id, nvel_nombre) VALUES (2, 'Medio');
INSERT INTO entrenamiento.niveles (nvel_id, nvel_nombre) VALUES (3, 'Dificil');

INSERT INTO entrenamiento.modojuego (mdo_juegoid, mdo_nombre) VALUES (1, 'Terminos');
INSERT INTO entrenamiento.modojuego (mdo_juegoid, mdo_nombre) VALUES (2, 'Numeros');

INSERT INTO entrenamiento.dificultadentrenamiento (dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento) VALUES (1, 1, 1, 5, 10, 6);
INSERT INTO entrenamiento.dificultadentrenamiento (dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento) VALUES (2, 1, 2, 10, 15, 12);
INSERT INTO entrenamiento.dificultadentrenamiento (dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento) VALUES (3, 1, 3, 15, 20, 20);
INSERT INTO entrenamiento.dificultadentrenamiento (dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento) VALUES (4, 2, 1, 5, 10, 5);
INSERT INTO entrenamiento.dificultadentrenamiento (dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento) VALUES (5, 2, 2, 7, 15, 7);
INSERT INTO entrenamiento.dificultadentrenamiento (dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento) VALUES (6, 2, 3, 15, 25, 20);