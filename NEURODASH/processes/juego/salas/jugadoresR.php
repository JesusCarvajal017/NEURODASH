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
        $data_normalice = $sys_salas->rankingPlayers($info_user[0]['sla_privadaid']);
    
        // generando la lista de juegadores
        foreach($data_normalice as $fila){
            $json_data_sala[] = [
                "name" => $fila['user_name'],
                "imageUser" => $fila['img_avatar'],
                "id" => $fila['user_id'],
                "puntaje" => $fila['sla_puntaje']
            ];
        };
    
    
    }else{
        $json_data_sala = ["status" => false];
    }

    echo json_encode($json_data_sala);  
?>