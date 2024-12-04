<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/deletes/juego/salas.php';

    session_start();
    $data_sys = new SalaDel();

    $info = file_get_contents("php://input");
    $data_report = json_decode($info, true);

    if(isset($data_report)){
        $data_sys->deleteSla($_SESSION['user_sala_validation']);
        unset($_SESSION['user_sala_validation']);
        unset($_SESSION['rool_user_sala']);
        unset($_SESSION['start_sala']);

        $respuesta = [
            "status" => true
        ];

        // header('Location: ../../../views/home.html');
    }else{
        $respuesta = [
            "status" => false
        ]; 
    }
    
    echo json_encode($respuesta);

?>