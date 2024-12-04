<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/deletes/juego/salas.php';

    session_start();
    $file  = file_get_contents("php://input"); 
    $dataInstSla = json_decode($file, true);

    $sys_salas = new SalaDel();
    try {
        $id_usuario = $dataInstSla['id_user'];
        $id_sala = $dataInstSla['id_sala'];

        $sys_salas->deleteUserSla($id_usuario, $id_sala);  

        // eliminacion de temp de union de sala
        unset($_SESSION['user_sala_validation']); 
        unset($_SESSION['rool_user_sala']); 
        
        $response = [
            "status" => true
        ];
    } catch (\Throwable $e) {
        $response = [
            "status" => false
        ];
    }

    echo json_encode($response);
?>