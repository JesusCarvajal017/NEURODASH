<?php
    header('Content-type:application/json');
    require '../db/cxion.php';
    // Base de datos (NUZIT)
    $conexionDb = new Conexion();

    // sentecias sql
    $cnsltaNiveles = "SELECT * FROM entrenamiento.niveles";

    // ejecucion sql
    $niveles = $conexionDb->consultar($cnsltaNiveles);


    foreach($niveles as $fila){
        $dataNiveles[] = [
            "nvel_id" => $fila["nvel_id"],
            "nvel_nombre" => $fila["nvel_nombre"]
        ]; 
    }

    echo json_encode($dataNiveles);
?>