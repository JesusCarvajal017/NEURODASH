<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/updates/juego/juego.php';
    require '../../../crud/querys/usuer/info_user.php';

    session_start();
    $data_play = new juegoUpdate();
    $data_user = new Data_user();

    $info = file_get_contents("php://input");
    $data_report = json_decode($info, true);

    if(isset($_SESSION['id_user'])){
        if(isset($data_report)){
            $info_status =  $data_user->participacionSla($_SESSION['id_user']);
            
            $data_play->updatePuntaje($_SESSION['id_user'],$info_status[0]['sla_privadaid'], $data_report['puntaje_user']);
        }else{
            echo "Debe ejecutarse dentro del aplicativo";
        }
    }else{
        echo "Sesion inactiva";
    }

?>