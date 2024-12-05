<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/deletes/juego/salas.php';
    require '../../../crud/querys/usuer/info_user.php';

    session_start();

    $info = file_get_contents("php://input");
    $data_report = json_decode($info, true);

    $data_sys = new SalaDel();
    $data_user = new Data_user();

    if(isset($_SESSION['id_user'])){
        if(isset($data_report)){
            $info_user = $data_user->participacionSla($_SESSION['id_user']);

            $data_sys->deleteSla($info_user[0]['sla_privadaid']);
            unset($_SESSION['start_sala']);
    
            $respuesta = [
                "status" => true
            ];

        }else{
            echo 'Accion no ejecutada, debe ejecutarse desde el aplicativo';
            exit;
        }
    }else{
        echo 'No hay sesion activa';
        exit;
    }

    echo json_encode($respuesta);
    
?>