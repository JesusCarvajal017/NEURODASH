<?php


    require '../../model/db/cxion.php';
    require '../../crud/querys/usuer/info_user.php';

    session_start(); 
   
    $sys_data = new Data_user();

    if(!empty($_SESSION['id_user'])){
        $data_all_user = $sys_data->allInfo($_SESSION['id_user']);

        header('Content-Type: application/json');
        echo json_encode($data_all_user);

    }else{
        echo "no hay usuario con session existente";
    }

?>