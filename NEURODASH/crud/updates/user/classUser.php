<?php
    class dataUpdataUser{
        private $id;
        private $password_user;

        public function setPasswordUser($contra){
            $this->password_user = $contra;
        }

        public function getPasswordUser(){
            return $this->password_user;
        }

        public function setId($id_user){
            $this->id = $id_user;
        }

        public function getId(){
            return $this->id;
        }

        
    }


?>