<?php

    session_start();

    if(!empty($_SESSION['id_user'])){
        // echo $_SESSION['id_user'];
        $response = ['session' => 'ok'];
    }else{
        $response = ['session' => 'no'];
    }

    json_encode($response); 


?>