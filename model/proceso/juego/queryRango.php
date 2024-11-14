<?php
    require 'juego.php';

    $info = file_get_contents('php://input');
    $data_user = json_decode($info, true);

    $sys_rangos = new ProcesoJuego();

    $info_rango = $sys_rangos->oneRango($data_user["id_rango"]);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($info_rango);
?>