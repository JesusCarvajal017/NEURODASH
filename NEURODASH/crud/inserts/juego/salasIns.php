<?php
    // require '';

    class SalaInst{
        private $sala;
        private $cxion;
        // private $

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function insertUserSla($id_user, $id_sla){
            try {
                $sql = "INSERT INTO public.salajugadores(
                            sla_privadaid, 
                            user_id)
                        VALUES ( :id_sala_priv, :id_usuario);";
                $values = [
                    ":id_sala_priv" => $id_sla,
                    ":id_usuario" => $id_user
                ];

                $this->cxion->ejecutar($sql, $values);

                return "La entrada del usuario ha sido exitosa";
            } catch (\Throwable $e) {
                return "Error al entrar a sala: ". $e->getMessage();
            }
        }

    }



?>
