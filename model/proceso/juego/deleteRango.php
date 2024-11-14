<?php
    require 'juego.php';

    $info = file_get_contents('php://input');
    $data_rango = json_decode($info, true);

    $sys_rangos = new ProcesoJuego();

    try {
        $sys_rangos->deleteRango($data_rango["id_rango"]);
        $response = ["status" => 'ok'];
    } catch (\Throwable $th) {
        $response = ["status" => 'no'];
    }


    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($response);



?>