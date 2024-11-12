<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/inserts/juego/salasIns.php';
    
    $file  = file_get_contents("php://input"); 
    $dataInstSla = json_decode($file, true);

    $sys_salas = new SalaInst();

    try {
        $id_usuario = $dataInstSla['id_user'];
        $id_sala = $dataInstSla['id_sala'];

        $sys_salas->insertUserSla($id_usuario, $id_sala);  
        
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