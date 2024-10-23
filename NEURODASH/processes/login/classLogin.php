<?php

    class Login{
        private $email;
        private $password;

        public function setEmail($email_user){
            $this->email = $email_user;
        }
        
        public function getEmail(){
            return $this->email;
        }
        
        public function setPassword($password_user){
            $this->password = $password_user;
        }
        public function getPassword(){
            return $this->password;
        }
    }


?>