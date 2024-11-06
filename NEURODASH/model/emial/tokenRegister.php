<?php

    session_start();
    require 'mesageToken.php';

    // $info_acces = file_get_contents('php://input');
    // $data_token = json_decode($info_acces, true);

    // generador de token
   

    $data_token = [
        "token_user" => intval($_SESSION['tokenRegistro']),
    ];


    $objeMessage = new MensaggeToken();

    // $objeMessage->mesaggeToken($_SESSION['tokenRegistro']);


    echo json_encode($data_token);

?>