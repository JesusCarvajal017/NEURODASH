<?php

    require '../../../NEURODASH/model/db/cxion.php';

    $conexion = Conexion::getInstance();


    $query = "SELECT rgo_id, rgo_nombre, rgo_exptope, rgo_img, rgo_multiplicador
            FROM public.rangos;";

    $dataRangos = $conexion->consultar($query);


    echo json_encode($dataRangos);


?>