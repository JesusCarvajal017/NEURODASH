<?php
    class Juego{
        private $id;
        private $rangoNombre;
        private $expTope;
        private $multiplicador;
    
        public function setId($i){
            $this->id = $i;
        }
        public function getId(){
            return  $this->id;
        }
        
        public function setRangoNombre($name){
            $this->rangoNombre = $name;
        }
        public function getRangoNombre(){
            return  $this->rangoNombre;
        }

        public function setExpTope($exp){
            $this->expTope = $exp;
        }
        public function getExpTope(){
            return  $this->expTope;
        }

        public function setMultiplicador($mul){
            $this->multiplicador = $mul;
        }
        public function getMultiplicador(){
            return $this->multiplicador;
        }



    }

?>