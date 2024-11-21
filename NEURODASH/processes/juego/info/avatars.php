<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/querys/juego/salas.php';
    
    header('Content-Type: application/json');

    $sys_salas = new Salas();

    echo json_encode($sys_salas->allAvatar());


?>