<?php
    session_start(); 
    if(empty( $_SESSION['temp_name']) &&  empty($_SESSION['tem_correo'])){
        $response = ["status" => false];
    }else{
        $response = ["status" => true]; 
    }

    echo json_encode($response);
?>