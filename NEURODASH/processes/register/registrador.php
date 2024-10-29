<?php
    require 'classregister.php';
    require '../../model/db/cxion.php';

    class RegistradorUser extends RegisterUser{
        private $conexion;

        public function __construct(){
            $this->conexion = Conexion::getInstance();
        }

        public function registrarUser(){
            $slq =  "INSERT INTO public.usuario(
                user_name, user_email,
                user_avatar, user_exp, 
                rgo_id, tp_user_id)
            VALUES (:apodo_user, :emial_user, :avatar_user , :exp_user, :rango_user, :tipo_user);";

            $values =  [
                ":apodo_user" => $this->getName(),
                ":emial_user" => $this->getEmail(),
                ":avatar_user" => 'sys_avatar.png',
                ":exp_user" => 0,
                ":rango_user" => 1,
                ":tipo_user" => 1
            ];


            $this->conexion->ejecutar($slq, $values);
        }

        // public function registerLogin(){
        //     $slq = ""
        // }


    }




?>