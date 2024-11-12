<?php

    session_start();

    if(!empty($_SESSION['id_user'])){
        $response = ['id_usuario' => $_SESSION['id_user']];
    }else{
        http_response_code(401);
        $response = ['id_usuario' => false];
    }
    
    header('Content-Type: application/json');
    echo json_encode($response); 

?>