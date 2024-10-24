<?php
    // require '../../model/db/cxion.php';

    class Data_user{
        // private $sql;
        private $emial;
        private $cxion;

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        public function id_user($emial_user){
            $sql_id = "SELECT user_id FROM public.usuario
                          WHERE user_email = :email;";

            $values = [':email'=> $emial_user];

            $data_usuario = $this->cxion->consultaIndividual($sql_id,$values);

            return $data_usuario;
        }

        public function allInfo($id){
            $this->sql= "SELECT user_id, user_name, user_email, user_avatar, user_exp, rgo_id, tp_user_id
	                        FROM public.usuario
                            WHERE user_id = :id_user;";

            $values = [":id_user" => $id];


            $data_usuario = $this->cxion->consultaIndividual($sql, $values);

            return $data_usuario;
        }



    }





?>