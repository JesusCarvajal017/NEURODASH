<?php

    session_start();
    
    if(!empty($_SESSION['id_user'])){
        session_destroy();
        header('Location: ../../index.html');
    }else{
        echo "no hay session existente";
    }

    $_SESSION = array();

?>