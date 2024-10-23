<?php
    require 'csLogin.php';
    require '../../crud/querys/usuer/info_user.php';

    session_start();

    $info_acces = file_get_contents('php://input');
    $data_acceso = json_decode($info_acces, true);


    $ejecutadorDb= new Acceso();
    $data_usuario = new Data_user();

    $ejecutadorDb->setEmail($data_acceso['user_email']);
    $ejecutadorDb->setPassword($data_acceso['user_password']);

    $verificacion_registro = $ejecutadorDb->validation_user();

    if($verificacion_registro == 1){

        $pre_data_user = $data_usuario->id_user($data_acceso['user_email']);
        
        // respuesta de acceso
        $resuesta_acceso = ["status"=> 'ok'];
        $_SESSION['id_user'] = $pre_data_user['user_id'];        
    }else{
        $resuesta_acceso = ["status"=> 'no'];
    }

    echo json_encode($resuesta_acceso);


?>