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
    

        public function updateAvatar($id_user, $id_avatar){
            $sql = "UPDATE usuario
                    SET 
                        avatarid = :id_user_av
                    WHERE user_id = :id_user";

            $values = [
                ":id_user_av" => $id_avatar,
                ":id_user" => $id_user
            ];

            $this->cxion->ejecutar($sql, $values);
        }

        public function updateName($id_user, $name){
            $sql = "UPDATE usuario
                    SET 
                        user_name = :name_new
                    WHERE user_id = :id_user";

            $values = [
                ":name_new" => $name,
                ":id_user" => $id_user
            ];

            $this->cxion->ejecutar($sql, $values);
        }

    }





?>