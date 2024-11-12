<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/deletes/juego/salas.php';
    
    $file  = file_get_contents("php://input"); 
    $dataInstSla = json_decode($file, true);

    $sys_salas = new SalaDel();

    try {
        $id_usuario = $dataInstSla['id_user'];
        $id_sala = $dataInstSla['id_sala'];

        $sys_salas->deleteUserSla($id_usuario, $id_sala);  
        
        $response = [
            "status" => true
        ];
    } catch (\Throwable $e) {
        $response = [
            "status" => false
        ];

        // echo "Error al ejecutar:  ".  $e->getMenssage();
    }

    // header('Content-Type: application/json');
    echo json_encode($response);


?>