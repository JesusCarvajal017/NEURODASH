<?php

    session_start();

    if(!empty($_SESSION['id_user'])){
        $response = ['session' => true];
    }else{
        http_response_code(401);
        $response = ['session' => false];
    }

    echo json_encode($response); 

?>