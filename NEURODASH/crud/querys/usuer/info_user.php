<?php
    // require '../../model/db/cxion.php';

    class Data_user{
        // private $sql;
        private $emial;
        private $cxion;

        public function __construct(){
            $this->cxion = Conexion::getInstance();
        }

        // obtencion del id del usuario por medio del correo
        public function id_user($emial_user){
            $sql_id = "SELECT user_id, user_name FROM public.usuario
                          WHERE user_email = :email;";

            $values = [':email'=> $emial_user];

            $data_usuario = $this->cxion->consultaIndividual($sql_id,$values);

            return $data_usuario;
        }

        // valida si existe un usuario con un nombre expecifico
        public function name_user($name_user){
            $sql_name = "SELECT user_name FROM public.usuario
                          WHERE user_name = :name_user;";

            $values = [':name_user'=> $name_user];

            $data_usuario = $this->cxion->numRegistros($sql_name,$values);

            return $data_usuario;
        }

        // valida si existe un usuario con un correo en especifico
        public function email_user($email_user){
            $sql_email = "SELECT user_name FROM public.usuario
                          WHERE user_email = :email;";

            $values = [':email'=> $email_user];

            $data_usuario = $this->cxion->numRegistros($sql_email,$values);

            return $data_usuario;
        }

        // informacion con id del usuario
        public function allInfo($id){
            $sql= "SELECT user_id, user_name, user_email, user_exp, rgo_id, tp_user_id, img_avatar
                    FROM public.usuario
                    INNER JOIN public.avatars
                        ON usuario.avatarid = avatars.id_avatar
                    WHERE user_id = :id_user;";

            $values = [":id_user" => $id];


            $data_usuario = $this->cxion->consultaIndividual($sql, $values);

            return $data_usuario;
        }
        


        public function queryUserSala($id_user){
            $sql = "SELECT sla_estado, salajugadores.user_id, sla_jug_id FROM public.salajugadores
                    INNER JOIN public.salasprivadas
                        ON salajugadores.sla_privadaid = salasprivadas.sla_privadaid
                    WHERE salajugadores.user_id = :id_user AND salasprivadas.sla_estado = :dafaul_status";
            
            $values = [
                ":id_user" => $id_user,
                ":dafaul_status" => 1  // estado activo === en sala
            ];

            $dataInfo = $this->cxion->numRegistros($sql,$values);

            return $dataInfo;

        }



    }





?>