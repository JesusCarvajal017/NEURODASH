<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/querys/juego/salas.php';
    require '../../../crud/querys/usuer/info_user.php';
    
    header('Content-Type: application/json');

    session_start();

    $sys_salas = new Salas();
    $sys_user = new Data_user();

    $json_data_sala = []; 

    $info_user = $sys_user->participacionSla($_SESSION['id_user']);

    if(!empty($info_user)){
        // data de juegadores
        $data_normalice = $sys_salas->jugadoresSla($info_user[0]['sla_privadaid']);
    
        // status jugador sala
        $status_user = $sys_user->statusSalaJugador($_SESSION['id_user'], $info_user[0]['sla_privadaid']);
    
        // status sala
        $status_sla = $sys_salas->statusSala($info_user[0]['sla_privadaid']);
    
        // generando la lista de juegadores
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
    }else{
        $data_respuesta = ["status" => false];
    }

    echo json_encode($data_respuesta);  
?>