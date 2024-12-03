<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/querys/juego/salas.php';
    require '../../../crud/querys/usuer/info_user.php';
    
    header('Content-Type: application/json');

    session_start();

    $file = file_get_contents("php://input");
    $data_sala = json_decode($file, true);
    
    $sys_salas = new Salas();
    $sys_user = new Data_user();

    $json_data_sala = []; 

    $data_normalice = $sys_salas->jugadoresSla($data_sala["id_sala"]);

    // status jugador sala
    $status_user = $sys_user->statusSalaJugador($_SESSION['id_user'], $_SESSION['user_sala_validation']);
    
    // status sala
    $status_sla = $sys_salas->statusSala($_SESSION['user_sala_validation']);

    foreach($data_normalice as $fila){
        $json_data_sala[] = [
            "name" => $fila['user_name'],
            "imageUser" => $fila['img_avatar'],
            "id" => $fila['user_id'],
        ];
    };

    $data_respuesta[] = [
        "status_sala" => $status_sla[0]['sla_estado'],
        "status_jugador" => $status_user,
        "jugadores_sala" => $json_data_sala
    ];

    echo json_encode($data_respuesta);
    
?>