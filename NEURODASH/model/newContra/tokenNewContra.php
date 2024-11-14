<?php
    require '../db/cxion.php';
    require 'messageToken.php';
    require '../../processes/email/envios.php';
    require '../../crud/querys/usuer/info_user.php';

    $data_user_sys = new Data_user();

    session_start();
    $temp_correo = $_POST['correoUserC'];
    
    // echo $_SESSION['temp_emial_contra_new'];
    
    // datos temporales de registro
    if(empty($_SESSION['temp_emial_contra_new'])){
        $_SESSION['temp_emial_contra_new'] = $temp_correo;
    }
    
    $temp_nombre  = $data_user_sys->id_user($_SESSION['temp_emial_contra_new']);

    $enviador_email = new Envio( $_SESSION['temp_emial_contra_new'], $temp_nombre[0]['user_name']); 

    function generarToken() {
        return str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    }

    // creacion del token
    if(empty($_SESSION['tokenRestoreContra'])){
        $_SESSION['tokenRestoreContra'] = generarToken();
        $_SESSION['user_temp_contra_new'] = $temp_nombre[0]['user_name'];
        $_SESSION['temp_id_recuperacion'] = $temp_nombre[0]['user_id'];
    }

    try {
        //code...
        header('Location: ../../views/tokens/tokenForgotPassword.html');
        $enviador_email->sendToken($_SESSION['tokenRestoreContra']);
    } catch (\Throwable $th) {
        echo 'paila no funciona'; 
    }
 ?>