<?php
    require 'usuario.php';

    $sys_user = new ProcesoUsuario();

    $info = file_get_contents('php://input');
    $dataUpdateUser = json_decode($info, true);

    $sys_user->setId($dataUpdateUser['user_id']);
    $sys_user->setAlias($dataUpdateUser['aliasUsuarioU']);
    $sys_user->setEmail($dataUpdateUser['emailUsuarioU']);
    $sys_user->setExp($dataUpdateUser['expUsuarioU']);
    $sys_user->setRango($dataUpdateUser['rgoUsuarioU']);
    $sys_user->setTipoUser($dataUpdateUser['tipoUsuarioU']);

    try {
        $sys_user->actualizar();
        $response = ["status"=>'ok'];
    } catch (\Throwable $e) {
        $response = ["status"=>'no'];
    }

    echo json_encode($response);

?>