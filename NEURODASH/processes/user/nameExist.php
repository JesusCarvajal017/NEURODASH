<?php 
    require '../../model/db/cxion.php';
    require '../../crud/querys/usuer/info_user.php';

    $info_acces = file_get_contents('php://input');
    $data_acceso = json_decode($info_acces, true);

    $data_usuario = new Data_user();

    $verificacion_name = $data_usuario->name_user($data_acceso['name_user']);

    if($verificacion_name == 1){
        $resuesta_acceso = ["status"=> 'ok'];
    }else{
        $resuesta_acceso = ["status"=> 'no'];
    }

    echo json_encode($resuesta_acceso);



?>