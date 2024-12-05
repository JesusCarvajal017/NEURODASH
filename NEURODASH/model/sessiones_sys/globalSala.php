<?php 
    require '../db/cxion.php';
    require '../../crud/querys/usuer/info_user.php'; 

    session_start();
    $data_sys = new Data_user();

    if(isset($_SESSION['id_user'])){
        $data_user = $data_sys->participacionSla($_SESSION['id_user']);
        if(!empty($data_user)){
            // mapeamos
            foreach($data_user as $fila){
                $data_json_user = [
                    "id_sala" => $fila['sla_privadaid'],
                    "rool" => $fila['sla_creater'],
                    "status" => true
                ];
            }
        }else{
            $data_json_user = [ "status" => false ];
        }

    }else{
        echo "No hay usuario con una sesion activa";
        exit;
    }

    header('Content-Type: application/json');
    echo json_encode($data_json_user);
?>

