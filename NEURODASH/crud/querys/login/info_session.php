<?php


    session_start();

    if(empty($_SESSION['id_user'])){
        $response = ["session" =>'no'];
    }else{
        $response = ["session" => 'ok'];
    }

    json_encode($response);




?>