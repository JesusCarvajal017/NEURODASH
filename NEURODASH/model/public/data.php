<?php

    session_start();

    if(!empty($_SESSION['id_user'])){
        $response = ['session' => 'ok'];
    }else{
        http_response_code(401);
        $response = ['session' => 'no'];
    }

    echo json_encode($response); 

?>