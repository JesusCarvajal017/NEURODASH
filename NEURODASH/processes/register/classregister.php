<?php

    class RegisterUser{
        private $nameUser;
        private $emailUser;
        private $password;

        public function setName($name){
            $this->nameUser = $name;
        }

        public function getName(){
            return $this->nameUser;
        }

        public function setEmail($email){
            $this->emailUser = $email;
        }

        public function getEmail(){
            return $this->emailUser;
        }

        public function setPassword($password){
            $this->password = $password;
        }

        public function getPassword(){
            return $this->password;
        }


    }



?>