<?php
    // require 'classUser.php';
    
    class UpdataUser{
        // private $sql;
        private $emial;
        private $cxion;

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function passwordNew($id, $contra){
            $sql = "UPDATE public.login
                    SET login_password= crypt(:password_user, gen_salt('bf'))
                    WHERE usuarioid = :id_user;";


            $values = [
                ":password_user" =>$contra,
                ":id_user" => $id,
            ];

            $this->cxion->ejecutar($sql, $values);
        }
    

    }





?>