<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/querys/juego/salas.php';
    
    header('Content-Type: application/json');

    $file = file_get_contents("php://input");
    $data_sala = json_decode($file, true);
    
    $sys_salas = new Salas();

    $json_data_sala = []; 

    $data_normalice = $sys_salas->jugadoresSla($data_sala["id_sala"]);

    foreach($data_normalice as $fila){
        $json_data_sala[] = [
            "name" => $fila['user_name'],
            "imageUser" => $fila['img_avatar'],
            "id" => $fila['user_id'],
        ];
    };
    
    echo json_encode($json_data_sala);
    
?>