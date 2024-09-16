<?php
    header('Content-type:application/json');
    require '../db/cxion.php';
    // Base de datos (NUZIT)
    $conexionDb = new Conexion();

    // sentecias sql
    $cnsltaNiveles = "SELECT * FROM entrenamiento.modojuego";

    // ejecucion sql
    $niveles = $conexionDb->consultar($cnsltaNiveles);


    foreach($niveles as $fila){
        $dataNiveles[] = [
            "mdo_juegoid" => $fila["mdo_juegoid"],
            "mdo_nombre" => $fila["mdo_nombre"]
        ]; 
    }

    echo json_encode($dataNiveles);
?>