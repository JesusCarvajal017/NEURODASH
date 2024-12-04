<?php
    header('Content-type:application/json');
    require '../db/cxion.php';

    $conexionDb = Conexion::getInstance();

    // sentecias sql
    $cnsltaTematica = "SELECT * FROM items";

    // ejecucion sql
    $Tematica = $conexionDb->consultar($cnsltaTematica);


    foreach($Tematica as $fila){
        $dataTematica[] = [
            "id_item" => $fila["id_item"],
            "nombre_item" => $fila["nombre_item"]
        ]; 
    }
    
    echo json_encode($dataTematica);

?>