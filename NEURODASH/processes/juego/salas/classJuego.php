<?php
    class JuegoEcp {
        private $id_jugador;
        private $id_sala;
        private $token_sala;
        private $sala_estado;
        private $cnt_jugadores;
        private $modo_juego;
        private $niveles_juego;
        private $items_id;

        // Métodos para id_jugador
        public function setIdJugador($idJugador) {
            $this->id_jugador = $idJugador;
        }

        public function getIdJugador() {
            return $this->id_jugador;
        }

        // Métodos para id_sala
        public function setIdSala($idSala) {
            $this->id_sala = $idSala;
        }

        public function getIdSala() {
            return $this->id_sala;
        }

        // Métodos para token_sala
        public function setTokenSala($tokenSala) {
            $this->token_sala = $tokenSala;
        }

        public function getTokenSala() {
            return $this->token_sala;
        }

        // Métodos para sala_estado
        public function setSalaEstado($salaEstado) {
            $this->sala_estado = $salaEstado;
        }

        public function getSalaEstado() {
            return $this->sala_estado;
        }

        // Métodos para cnt_jugadores
        public function setCntJugadores($cntJugadores) {
            $this->cnt_jugadores = $cntJugadores;
        }

        public function getCntJugadores() {
            return $this->cnt_jugadores;
        }

        // Métodos para modo_juego
        public function setModoJuego($modoJuego) {
            $this->modo_juego = $modoJuego;
        }

        public function getModoJuego() {
            return $this->modo_juego;
        }

        // Métodos para niveles_juego
        public function setNivelesJuego($nivelesJuego) {
            $this->niveles_juego = $nivelesJuego;
        }

        public function getNivelesJuego() {
            return $this->niveles_juego;
        }

        // Métodos para items_id
        public function setItemsId($itemsId) {
            $this->items_id = $itemsId;
        }

        public function getItemsId() {
            return $this->items_id;
        }
    }

?>