<?php
    require 'registrador.php';
    require '../../crud/querys/usuer/info_user.php';

    session_start();
    $informacionUser = new Data_user();
    $registrador = new RegistradorUser();

    $registrador->setName($_SESSION['temp_name']);
    $registrador->setEmail($_SESSION['tem_correo']);
    $registrador->setPassword($_POST['passwordUser']);


    try {
        $registrador->registrarUser();
        $id_userNew = $informacionUser->id_user($_SESSION['tem_correo']);
        // registrarLogi
        $registrador->registrarLogi($id_userNew[0]["user_id"]);

        // elimnar los datos temporales de registro
        session_unset();
        session_destroy();

        header('Location: ../../views/forms/login.html');
    } catch (\Throwable $e) {
        echo "el registro no fue exitoso"."<br>";
        echo $e;
    }

?>