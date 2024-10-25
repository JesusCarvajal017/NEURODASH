<?php
    require 'usuario.php';

    $sys_user = new ProcesoUsuario();

    $info = file_get_contents('php://input');
    $dataRegistarUser = json_decode($info, true);
    
    $sys_user->setAlias($dataRegistarUser['aliasUsuario']);
    $sys_user->setEmail($dataRegistarUser['emailUsuario']);
    $sys_user->setExp($dataRegistarUser['expUsuario']);
    $sys_user->setRango($dataRegistarUser['rgoUsuario']);
    $sys_user->setTipoUser($dataRegistarUser['tipoUsuario']);
    
    try {
        $sys_user->registrar();
        $response = ["status"=>'ok'];
    } catch (\Throwable $e) {
        $response = ["status"=>'no'];
    }

    echo json_encode($response);



?>