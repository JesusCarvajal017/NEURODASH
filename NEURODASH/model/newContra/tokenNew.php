<?php

    session_start();
    $data_token = [
        "token_user" => $_SESSION['tokenRestoreContra'],
    ];

    // echo $_SESSION['tokenRestoreContra'];

    echo json_encode($data_token);

?>