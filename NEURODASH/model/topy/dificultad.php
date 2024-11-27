<?php
    header('Content-type:application/json');
    require '../db/cxion.php';

    $conexionDb = Conexion::getInstance();

    // sentecias sql
    $cnsltaDifiTopy =  "SELECT * FROM public.\"dificultadTopy\""; 

    // ejecucion sql
    $niveles = $conexionDb->consultar($cnsltaDifiTopy);


    foreach($niveles as $fila){
        $dataNiveles[] = [
            "id_dfi_Topy" => $fila["id_dfi_Topy"],
            "name_difi_topy" => $fila["name_difi_topy"],
            "img_correctas" => $fila["img_correctas"],
            "img_incorrectas" => $fila["img_incorrectas"]

        ]; 
    }
    
    echo json_encode($dataNiveles);

?>