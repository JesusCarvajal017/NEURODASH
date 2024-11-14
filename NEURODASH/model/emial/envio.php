<?php
    require 'mesageToken.php';
    require '../../processes/email/envios.php';

    session_start();
    $temp_name = $_POST['txtUsernameB'];
    $temp_correo = $_POST['txtEmailB'];

    echo $_SESSION['temp_name']. "</b>";
    echo $_SESSION['tem_correo'];

    // datos temporales de registro
    if(empty( $_SESSION['temp_name']) &&  empty($_SESSION['tem_correo'])){
        $_SESSION['temp_name'] = $temp_name;
        $_SESSION['tem_correo'] = $temp_correo;
    }

    $enviador_email = new Envio( $_SESSION['tem_correo'],$_SESSION['temp_name']); 

    function generarToken() {
        return str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    }

    // creacion del token
    if(empty($_SESSION['tokenRegistro'])){
        $_SESSION['tokenRegistro'] = generarToken();
    }

    try {
        //code...
        header('Location: ../../views/tokens/tokenMain.html');
        $enviador_email->sendToken($_SESSION['tokenRegistro']);
    } catch (\Throwable $th) {
        echo 'paila no funciona'; 
    }
?>