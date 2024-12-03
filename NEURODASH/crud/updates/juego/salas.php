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
    }

?>
