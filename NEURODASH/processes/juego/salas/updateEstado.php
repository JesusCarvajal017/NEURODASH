<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/updates/juego/salas.php';

    session_start();
    $data_sys = new JuegoData();

    $info = file_get_contents("php://input");
    $data_report = json_decode($info, true);

    if(isset($data_report)){
        $data_sys->updateStatus($_SESSION['user_sala_validation'], 2);;

        $respuesta = [
            "status" => true
        ];
    }else{
        $respuesta = [
            "status" => false
        ]; 
    }
    
    echo json_encode($respuesta);

?>