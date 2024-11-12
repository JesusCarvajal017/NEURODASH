<?php
    // require '';

    class SalaDel{
        private $sala;
        private $cxion;
        // private $

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function deleteUserSla($id_user, $id_sla){
            try {
                $sql = "DELETE FROM public.salajugadores
                    WHERE sla_privadaid = :id_sala  AND user_id = :id_usuario";

                $values = [
                    ":id_sala" => $id_sla,
                    ":id_usuario" => $id_user
                ];

                $this->cxion->ejecutar($sql, $values);

                return "La salida del usuario ha sido exitosa";
            } catch (\Throwable $e) {
                return "Error al eliminar el usuario de la sala: ". $e->getMessage();
            }
            
        }
    }

?>
