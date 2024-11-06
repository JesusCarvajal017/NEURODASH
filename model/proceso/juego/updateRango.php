<?php
    require 'juego.php';

    $sys_rango = new ProcesoJuego();

    $info = file_get_contents('php://input');
    $dataUpdateRango = json_decode($info, true);

    $sys_rango->setId($dataUpdateRango['id_rango']);
    $sys_rango->setRangoNombre($dataUpdateRango['nombreRango']);
    $sys_rango->setExpTope($dataUpdateRango['expTope']);
    $sys_rango->setMultiplicador($dataUpdateRango['multiplicador']);
    
    try {
        $sys_rango->actualizar();
        $response = ["status"=>'ok'];
    } catch (\Throwable $e) {
        $response = ["status"=>'no'];
        echo $e;
    }

    echo json_encode($response);

?>