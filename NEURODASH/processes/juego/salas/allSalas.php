<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/querys/juego/salas.php';
    
    header('Content-Type: application/json');

    $sys_salas = new Salas();
    $data_salas = $sys_salas->allSala();

    echo json_encode($data_salas);
?>