<?php
    require 'usuario.php';

    $info = file_get_contents('php://input');
    $data_user = json_decode($info, true);

    $sys_usuer = new ProcesoUsuario();

    try {
        $sys_usuer->deleteUser($data_user["user_id"]);
        $response = ["status" => 'ok'];
    } catch (\Throwable $th) {
        $response = ["status" => 'no'];
    }


    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);



?>