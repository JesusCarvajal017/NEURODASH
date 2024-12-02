<?php
    require '../../../processes/juego/salas/classJuego.php';

    class SalaInst extends JuegoEcp{
        private $sala;
        private $cxion;

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function insertUserSla($id_user, $id_sla){
            try {
                $sql = "INSERT INTO public.salajugadores(
                            sla_privadaid, 
                            user_id,
                            sla_puntaje,
                            sla_creater)
                        VALUES (:id_sala_priv, :id_usuario, :puntaje, :creater);";
                $values = [
                    ":id_sala_priv" => $id_sla,
                    ":id_usuario" => $id_user,
                    ":puntaje" => 0,
                    ":creater" => 0,
                ];

                $this->cxion->ejecutar($sql, $values);

                return "La entrada del usuario ha sido exitosa";
            } catch (\Throwable $e) {
                return "Error al entrar a sala: ". $e->getMessage();
            } 
        }

        public function createSala(){
            $sql = "CALL registrosala(:id_sala, :id_user, :toke_sala , :estado, :jugadores, :modo, :nivel, :items);";
            // CALL registrosala(4564,95,4537,1,23,1,1);
            // registrosala(id_sala INT, id_user INT, toke_sala INT, estado INT, jugadores INT,  modo INT, nivel INT, items INT) 


            $values = [
                ":id_sala" => $this->getIdSala(),
                ":id_user" => $this->getIdJugador(),
                ":toke_sala" => $this->getTokenSala(),
                ":estado" => 1,
                ":jugadores" => $this->getCntJugadores(),
                ":modo" => $this->getModoJuego(),
                ":nivel" => $this->getNivelesJuego(),
                ":items" => $this->getItemsId(),
            ];

            // print_r($values);

            $this->cxion->ejecutar($sql, $values);

        }

        public function idValidoSala($token){
            $sql = "SELECT * FROM public.salasprivadas
                    WHERE sla_privadaid = :token";
            $values = [
                ":token" => $token,
            ];

            $dataInfo = $this->cxion->numRegistros($sql,$values);

            return $dataInfo;

        }

        public function tokenVlaSala($token){
            $sql = "SELECT * FROM public.salasprivadas
                    WHERE sla_token = :token";
            $values = [
                ":token" => $token,
            ];

            $dataInfo = $this->cxion->numRegistros($sql,$values);

            return $dataInfo;

        }

        // public function delteSala(){
            


        // }


        // CALL registroSala(2323, 95, 4532,1, 24, 1,1, null);
        // CALL eliminarSala(2323, 95);

    }



?>
