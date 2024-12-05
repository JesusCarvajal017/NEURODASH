<?php
    class JuegoData{
        private $cxion;

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function updateStatus($id_sala, $status_sala){
            $sql = "UPDATE public.salasprivadas
                    SET  sla_estado = :status_sala
                    WHERE sla_privadaid = :id_sala;";
    
            $values = [
                ":status_sala" => $status_sala,
                ":id_sala" => $id_sala,
            ];

            $informacion = $this->cxion->ejecutar($sql, $values);
            return $informacion;
        }

        public function updatePuntaje($id_sala, $puntaje, $id_user){
            $sql = "UPDATE public.salajugadores
                    SET sla_puntaje = :puntaje_user
                    WHERE sla_privadaid = :id_sala AND user_id = :id_user;";
    
            $values = [
                ":puntaje_user" => $puntaje,
                ":id_sala" => $id_sala,
                ":id_user" => $id_user
            ];

            $informacion = $this->cxion->ejecutar($sql, $values);
            return $informacion;
        }

        
    }

?>
