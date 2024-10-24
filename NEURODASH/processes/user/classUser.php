<?php

    require '../../model/db/cxion.php';

    class User{
        private $conexion;
        private $userid;
        private $querySql;

        public function __construct(){
            // $this->conexion = Conexion::getInstance();
        }

        public function datoUsuario($name_usuario){
            $this->querySql = "SELECT user_id, user_name, user_email, user_avatar, user_exp, rgo_id, tp_user_id
	                            FROM public.usuario
                                WHERE user_name = :;";
                                
            $values = [ "name_usuario" => $name_usuario ];

            // $data
            //             $this->conexion->;

        }


    }




?>