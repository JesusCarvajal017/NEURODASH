<?php
    require 'classLogin.php';
    require '../../model/db/cxion.php';

    class Acceso extends Login{
        private $sql;
        private $conexion;

        public function __construct(){
            $this->conexion = Conexion::getInstance();
        }
        
        public function validation_user(){
            $sql_query = "SELECT login_password, user_email FROM public.login
                            INNER JOIN public.usuario
                                ON login.usuarioid = usuario.user_id
                            WHERE user_email = :user_email
                            AND login_password = crypt(:user_password, login_password)";

            $values_query = [
                ":user_email" => $this->getEmail(),
                ":user_password" => $this->getPassword(),
            ];


            $key_acceso = $this->conexion->numRegistros($sql_query, $values_query);


            return $key_acceso;
        }
    }
    




?>