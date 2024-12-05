<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/updates/juego/salas.php';
    require '../../../crud/querys/usuer/info_user.php';

    session_start();
    $data_sys = new JuegoData();
    $data_user = new Data_user();

    $info = file_get_contents("php://input");
    $data_report = json_decode($info, true);

    if(isset($data_report)){
        $info_user = $data_user->participacionSla($_SESSION['id_user']);

        $data_sys->updateStatus($info_user[0]['sla_privadaid'], 2);;

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