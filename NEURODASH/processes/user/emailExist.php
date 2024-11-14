<?php 
    require '../../model/db/cxion.php';
    require '../../crud/querys/usuer/info_user.php';

    $info_acces = file_get_contents('php://input');
    $data_acceso = json_decode($info_acces, true);

    $data_usuario = new Data_user();

    $verificacion_email = $data_usuario->email_user($data_acceso['email_user']);

    if($verificacion_email == 1){
        // respuesta de acceso
        $resuesta_acceso = ["status"=> 'ok'];
    }else{
        $resuesta_acceso = ["status"=> 'no'];
    }

    echo json_encode($resuesta_acceso);
?>