<?php 
    session_start();
    $info = file_get_contents("php://input");
    $data_sys = json_decode($info, true);


    if(isset($_SESSION['user_sala_validation']) && isset($_SESSION['rool_user_sala'])){
        $response = [
            "session_sala" => $_SESSION['user_sala_validation'],
            "rool" => $_SESSION['rool_user_sala'],
            "status" => true
        ];
    }else{
        if(!empty($data_sys)){
            $_SESSION['user_sala_validation'] = $data_sys['sala_validation'];
            $_SESSION['rool_user_sala'] = $data_sys['rool'];
            $response = [
                "sesion_sala" => $_SESSION['user_sala_validation'],
                "rool" => $_SESSION['rool_user_sala'],
                "status" => true
            ]; 
        }else{
            $response = [
                "status" => false
            ];
        }
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>

