<?php
    session_start();

    require '../db/cxion.php';
    require '../../crud/querys/usuer/info_user.php';

    $data_sys = new Data_user();

    if(!empty($_SESSION['id_user']) && !empty($_SESSION['sala_validation'])){    
        $data_validation =  $data_sy->queryUserSala($_SESSION['id_user']); // validacion de si el usuario esta en una sala de esperar

        $response = ['status_viculacion' => $data_validation]; 
    }else{
        $response = ['id_usuario' => false];
    }

    header('Content-Type: application/json');
    echo json_encode($response); 
?>