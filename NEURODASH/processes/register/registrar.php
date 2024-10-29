<?php
    require 'registrador.php';

    session_start();
    $registrador = new RegistradorUser();

    $registrador->setName($_SESSION['temp_name']);
    $registrador->setEmail($_SESSION['tem_correo']);

    try {
        $registrador->registrarUser();
        header('Location: ../../views/forms/validationToken.html');
    } catch (\Throwable $e) {
        echo "el registro no fue exitoso"."<br>";
        echo $e;
    }

?>