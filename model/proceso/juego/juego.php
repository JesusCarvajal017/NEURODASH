<?php

    require '../../../NEURODASH/model/db/cxion.php';
    require 'classJuego.php';

    class ProcesoJuego extends Juego{
        private $id;
        private $sql;
        public $conexion;

        public function __construct(){
            $this->conexion = Conexion::getInstance();
        }

        public function rangos(){
            $this->sql = "SELECT rgo_id, rgo_nombre, rgo_exptope, rgo_img, rgo_multiplicador
	                        FROM public.rangos
                            ORDER BY rgo_multiplicador DESC;"; 

            $data_rangos = $this->conexion->consultar($this->sql);

            return $data_rangos;
        }
        
        public function oneRango($id_rango){
            $this->sql = "SELECT rgo_id, rgo_nombre, rgo_exptope, rgo_img, rgo_multiplicador
                            FROM public.rangos
                            WHERE rgo_id = :id;"; 
            $values = [
                ":id" => $id_rango
            ];

            $data_rango = $this->conexion->consultaIndividual($this->sql,$values);

            return $data_rango;
        }

        public function registrar(){
            $slq =  "INSERT INTO public.rangos(
                        rgo_nombre, 
                        rgo_exptope, rgo_img, 
                        rgo_multiplicador)
                    VALUES (:rgo_nombre, :rgo_exptope, :rgo_img, :rgo_multiplicador);";

            $values =  [
                ":rgo_nombre" => $this->getRangoNombre(),
                ":rgo_exptope" => $this->getExpTope(),
                ":rgo_img" => 'sys_img.png',
                ":rgo_multiplicador" => $this->getMultiplicador(),
            ];

    
            $this->conexion->ejecutar($slq, $values);

        }

        public function actualizar(){
            $slq =  "UPDATE public.rangos
                        SET rgo_nombre= :rgo_nombre, 
                            rgo_exptope= :rgo_exptope, 
                            rgo_multiplicador= :rgo_multiplicador
                        WHERE rgo_id = :id;";

            $values =  [
                ":id" => $this->getId(),
                ":rgo_nombre" => $this->getRangoNombre(),
                ":rgo_exptope" => $this->getExpTope(),
                ":rgo_multiplicador" => $this->getMultiplicador(),
            ];

    
            $this->conexion->ejecutar($slq, $values);
        }


        public function deleteRango($id_rango){
            $this->sql = "DELETE FROM public.rangos
                            WHERE rgo_id = :id_rango;";

            $values = [
                ":id_rango" => $id_rango,
            ];

            $this->conexion->ejecutar($this->sql, $values);
        }

    }

?>