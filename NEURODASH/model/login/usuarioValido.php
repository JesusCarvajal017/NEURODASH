<?php

    include('../db/cxion.php');

    $conexion = new Conexion();

    $value = [
        ":nameUser" => 'yisus017',
    ];

    $slqUsuario = "SELECT user_name FROM public.usuario
                    WHERE user_name = :nameUser";


    echo $conexion->numRegistros($slqUsuario, $value);


?>