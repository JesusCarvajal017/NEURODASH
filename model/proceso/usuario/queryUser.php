<?php
    require 'usuario.php';

    $sys_usuer = new ProcesoUsuario();

    $info_usarios = $sys_usuer->Usuers();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($info_usarios);

?>