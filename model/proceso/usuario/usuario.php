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
        
        public function oneUser($id_user){
            $this->sql = "SELECT user_id, user_name, user_email, user_avatar, user_exp, rgo_nombre, tp_user_name, a.rgo_id, a.tp_user_id
                            FROM public.usuario a
                            INNER JOIN public.rangos
                                ON a.rgo_id = rangos.rgo_id
                            INNER JOIN public.tipousuario
                                ON a.tp_user_id = tipousuario.tp_user_id
                            WHERE user_id = :id;"; 
            $values = [
                ":id" => $id_user
            ];

            $data_user = $this->conexion->consultaIndividual($this->sql,$values);

            return $data_user;
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

        public function actualizar(){
            $slq =  "UPDATE public.usuario
                    SET user_name= :apodo_user, 
                        user_email= :emial_user,  
                        user_exp= :exp_user, 
                        rgo_id= :rango_user, 
                        tp_user_id= :tipo_user
                    WHERE user_id = :id_user;";

            $values =  [
                ":id_user" => $this->getId(),
                ":apodo_user" => $this->getAlias(),
                ":emial_user" => $this->getEmail(),
                ":exp_user" => $this->getExp(),
                ":rango_user" => $this->getRango(),
                ":tipo_user" => $this->getTipoUser()
            ];

    
            $this->conexion->ejecutar($slq, $values);
        }


        public function deleteUser($id_user){
            $this->sql = "DELETE  FROM usuario
                        WHERE user_id = :id_user; ";

            $values = [
                ":id_user" => $id_user,
            ];

            $this->conexion->ejecutar($this->sql, $values);
        }

    }





?>