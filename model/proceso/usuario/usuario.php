<?php

    require '../../../NEURODASH/model/db/cxion.php';
    require 'classUser.php';

    class ProcesoUsuario extends Usuario{
        private $id;
        private $sql;
        public $conexion;

        public function __construct(){
            $this->conexion = Conexion::getInstance();
        }

        public function Usuers(){
            $this->sql = "SELECT user_id, user_name, user_email, user_avatar, user_exp, rgo_nombre, tp_user_name
                            FROM public.usuario
                            INNER JOIN public.rangos
                                ON usuario.rgo_id = rangos.rgo_id
                            INNER JOIN public.tipousuario
                                ON usuario.tp_user_id = tipousuario.tp_user_id
                            ORDER BY user_name ASC;"; 

            $data_users = $this->conexion->consultar($this->sql);

            return $data_users;
        }

        public function registrar(){
            $slq =  "INSERT INTO public.usuario(
                                user_name, user_email,
                                user_avatar, user_exp, 
                                rgo_id, tp_user_id)
                            VALUES (:apodo_user, :emial_user, 'sys_avatar.png', :exp_user, :rango_user, :tipo_user);";

            $values =  [
                ":apodo_user" => $this->getAlias(),
                ":emial_user" => $this->getEmail(),
                ":exp_user" => $this->getExp(),
                ":rango_user" => $this->getRango(),
                ":tipo_user" => $this->getTipoUser()
            ];

    
            $this->conexion->ejecutar($slq, $values);
        }

    }





?>