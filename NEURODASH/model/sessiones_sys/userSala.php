<?php 

    session_start();
    $info = file_get_contents("php://input");
    $data_sys = json_decode($info, true);

    if(empty($_SESSION['user_sala_validation'])){
        $_SESSION['user_sala_validation'] = $data_sys['sala_validation'];
        $response = ["session_sala" => $_SESSION['user_sala_validation']];
    }else{
        // $_SESSION['user_sala_validation'] = false;
        $response = ["session_sala" => $_SESSION['user_sala_validation']];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>

