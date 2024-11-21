<?php 
    session_start();

    unset($_SESSION['tokenRestoreContra']);
    unset($_SESSION['temp_emial_contra_new']);
    unset($_SESSION['user_temp_contra_new']);
    unset($_SESSION['temp_id_recuperacion']);

    header('Location: ../../views/forms/forgotPassword.html');

?>