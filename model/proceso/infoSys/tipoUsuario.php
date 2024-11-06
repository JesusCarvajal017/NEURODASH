<?php

    require '../../../NEURODASH/model/db/cxion.php';

    $conexion = Conexion::getInstance();


    $query = "SELECT tp_user_id, tp_user_name
	FROM public.tipousuario;";

    $dataTp = $conexion->consultar($query);


    echo json_encode($dataTp);


?>