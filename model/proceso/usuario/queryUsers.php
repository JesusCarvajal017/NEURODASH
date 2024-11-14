<?php
    require 'usuario.php';

    $info = file_get_contents('php://input');
    $data_user = json_decode($info, true);

    $sys_usuer = new ProcesoUsuario();

    $info_usario = $sys_usuer->oneUser($data_user["user_id"]);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($info_usario);
?>