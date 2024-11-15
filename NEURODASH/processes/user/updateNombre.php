<?php 
    require '../../model/db/cxion.php';
    require '../../crud/updates/user/user.php';
    
    $info = file_get_contents("php://input");
    $data_update = json_decode($info, true);

    $data_usuario = new UpdataUser();
    
    try {
        $data_usuario->updateName($data_update['id_user'], $data_update['name_user']);
        $response = [
            
            "status"=>  true
        ];
    } catch (\Throwable $th) {
        $response = [
            "status"=>  false
        ];
    }

    echo json_encode($response); 

?>