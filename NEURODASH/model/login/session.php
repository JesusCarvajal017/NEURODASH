<?php
    session_start();
    if($_SESSION['user_id']){
        $respose = ["status" =>'no'];
        // header("Location: http://localhost/NEURODASH-REPO/NEURODASH/views/forms/login.html");
    }else{
        $respose = ["status" => 'no'];
    }

    echo json_encode($respose);


?>