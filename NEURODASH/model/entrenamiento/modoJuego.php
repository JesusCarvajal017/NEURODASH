<?php
    header('Content-type:application/json');
    require '../db/cxion.php';
    // Base de datos (NUZIT)
    $conexionDb = new Conexion();

    // sentecias sql
    $cnsltaModoJuego = "SELECT * FROM entrenamiento.modojuego";

    // ejecucion sql
    $modoJuegos = $conexionDb->consultar($cnsltaModoJuego);


    foreach($modoJuegos as $fila){
        $dataModosJuego[] = [
            "mdo_juegoId" => $fila["mdo_juegoid"],
            "mdo_nombre" => $fila["mdo_nombre"]
        ]; 
    }
    
    echo json_encode($dataModosJuego);

?>