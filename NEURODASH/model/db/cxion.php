<?php
    require 'config-cxion.php';

    class Conexion{
        private $dns;
        private $server;
        private $dbname;
        private $user;
        private $password;

        public function __construct(){
            global $SERVER;
            global $NAME_DB;
            global $USER;
            global $PASSWORD;

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
            while($fila = $consulta->fetch(PDO::FETCH_ASSOC)){
                $resultado[] = $fila;
            };

            return $resultado;
        }


        public function ejecutar($value, $sql){
            $conexion = $this->conexionDb();
            $consulta = $conexion->prepare($sql);
            $consulta->execute($value);

            return $consulta;
        }
    }





?>