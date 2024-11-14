<?php
    require 'juego.php';

    $sys_rango = new ProcesoJuego();

    $info = file_get_contents('php://input');
    $datarangosR = json_decode($info, true);
    
    $sys_rango->setRangoNombre($datarangosR['nombreRango']);
    $sys_rango->setExpTope($datarangosR['expTope']);
    $sys_rango->setMultiplicador($datarangosR['multiplicador']);
    
    try {
        $sys_rango->registrar();
        $response = ["status"=>'ok'];
    } catch (\Throwable $e) {
        $response = ["status"=>'no'];
    }

    echo json_encode($response);



?>