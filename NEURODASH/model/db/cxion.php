<?php
    class Conexion{
        private static $instance = null;
        private $dns;
        private $server;
        private $dbname;
        private $user;
        private $password;

        private function __construct(){
            require 'config-cxion.php';

            $this->server = $SERVER;
            $this->dbname = $NAME_DB;
            $this->user = $USER;
            $this->password = $PASSWORD;
        }

        public function conexionDb(){
            $this->dns = 'pgsql:host='.$this->server.';dbname='.$this->dbname.'';
            try {
                $conexion = new PDO($this->dns, $this->user, $this->password);
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                // echo "conexion a al base de datos exitosa";
            } catch (PDOException $e) {
                echo "Error al conectar al base de datos: ". $e->getMessage();
            }

            return $conexion;
        }

        public function consultar($sql){
            $conexion = $this->conexionDb();
            $consulta = $conexion->query($sql);
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)){
                $resultado[]= $fila;
            } 
            return $resultado;
        }

        public function consultaIndividual($sql, $values){
            $conexion = $this->conexionDb();
            $consulta = $conexion->prepare($sql);
            $consulta->execute($values);

            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)){
                $resultado[]= $fila;
            } 
            return $resultado;
        }

        // insert, update, delete
        public function ejecutar($sql, $value){
            $conexion = $this->conexionDb();
            $consulta = $conexion->prepare($sql);
            $consulta->execute($value);

            return $consulta;
        }

        // verificacion de registro
        public function numRegistros($sql, $values){
            $conexion = $this->conexionDb();
            $consulta = $conexion->prepare($sql);
            $consulta->execute($values);

            $num = $consulta->rowCount();

            return $num;
        }

        public static function getInstance(){
            if(self::$instance === null){
                self::$instance = new Conexion();
            }

            return self::$instance;
        }

        // prevenir la clonacion de la instancia
        private function __clone(){}

        // prevenir la deserializacion de la instancia
        public function __wakeup(){}
    
    }
?>