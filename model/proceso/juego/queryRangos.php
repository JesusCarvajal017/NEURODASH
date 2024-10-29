<?php
    require 'juego.php';

    $sys_rangos = new ProcesoJuego();

    $info_rangos = $sys_rangos->rangos();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($info_rangos);

?>