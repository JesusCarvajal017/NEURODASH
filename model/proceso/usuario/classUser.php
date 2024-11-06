<?php

    class Usuario{
        private $user_Id;
        private $alias;
        private $email;
        private $experiencia;
        private $rango;
        private $tipoUser;

        public function setId($id){
            $this->user_Id = $id;
        }
        public function getId(){
            return  $this->user_Id;
        }

        public function setAlias($name){
            $this->alias = $name;
        }
        public function getAlias(){
            return  $this->alias;
        }

        public function setEmail($email){
            $this->email = $email;
        }
        public function getEmail(){
            return $this->email;
        }

        public function setExp($exp){
            $this->experiencia = $exp;
        }

        public function getExp(){
            return $this->experiencia;
        }

        public function setRango($rango){
            $this->rango = $rango;
        }

        public function getRango(){
            return $this->rango;
        }

        public function setTipoUser($tipo){
            $this->tipoUser = $tipo;
        }

        public function getTipoUser(){
            return $this->tipoUser;
        }


    }

?>