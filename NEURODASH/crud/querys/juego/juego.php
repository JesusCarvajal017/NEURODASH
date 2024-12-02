<?php
    class JuegoData{
        private $cxion;

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function dataTerminosRandom($items, $cantidad){
            $sql = "SELECT id, nombre, id_item
                    FROM public.subitem
                    WHERE id_item = :item_id
                    ORDER BY random()
                    LIMIT :cantidad_subitems;";

            $values = [
                ":item_id" => $items,
                ":cantidad_subitems" => $cantidad,
           ];

            $informacion = $this->cxion->consultaIndividual($sql, $values);

            return $informacion;
            
        }

        public function dataJuegoEjecu($modo, $nivel){
            $sql = "SELECT  
                            dfi_tiempovista, 
                            dfi_tiemporespuesta, 
                            dfi_cantidadelemento, 
                            dfi_rodas
                    FROM public.dificultadentrenamiento
                    WHERE mdo_juegoid = :modo AND nvel_id = :nivel;";

            $values = [
                ":modo" => $modo,
                ":nivel" => $nivel,
           ];

            $informacion = $this->cxion->consultaIndividual($sql, $values);

            return $informacion;
        }

        public function salavigenMin($id_sala){
            $sql = "SELECT 
                        mdo_id, 
                        nvl_id, 
                        items_id
                    FROM public.configsala
                    WHERE sla_privadaid = :id_sala";

            $values = [
                ":id_sala" => $id_sala
            ];

            $informacion_sala = $this->cxion->consultaIndividual($sql, $values);

            return $informacion_sala;
        }
    }

?>
