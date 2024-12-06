<?php     

     class juegoUpdate{
          private $conexion;

          public function __construct(){
               $this->conexion = Conexion::getInstance();
          }

          public function updatePuntaje($idUser, $idSala, $puntaje){
               $sql = "UPDATE public.salajugadores
                         SET sla_puntaje = :puntaje_user
                    WHERE sla_privadaid = :id_sala AND user_id = :userio_id";
               
               $values = [
                    ":userio_id" => $idUser,
                    ":id_sala" => $idSala,
                    ":puntaje_user" => $puntaje,
               ];

               $this->conexion->ejecutar($sql, $values); 
          }
     }
?>