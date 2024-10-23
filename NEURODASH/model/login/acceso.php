<?php
    require('../db/cxion.php');

    $conexion = new Conexion(); 

    $info_acces = file_get_contents('php://input');
    $data_acceso = json_decode($info_acces, true);

    $values_login = [
        ":user_email" => $data_acceso['user_email'],
        ":user_password" => $data_acceso['user_password']
    ];

    $verificacion_acceso = "SELECT login_password, user_email FROM public.login
                            INNER JOIN public.usuario
                                ON login.usuarioid = usuario.user_id
                            WHERE user_email = :user_email
                            AND login_password = crypt(:user_password, login_password)";


    $verificacion_registro = $conexion->numRegistros($verificacion_acceso, $values_login);

    if($verificacion_registro == 1){
        
        // respuesta de acceso
        $resuesta_acceso = ["status"=> 'ok'];

        session_start();
        
        $sql_usuario = "SELECT user_id, user_name, user_email, user_avatar, user_exp, rgo_id, tp_user_id
                            FROM public.usuario
                            WHERE user_email = :user_email";
        
        $data_user = $conexion->consultaIndividual($sql_usuario, $values_login);

        $_SESSION['user_id'] = $data_acceso['user_id'] ;
        // $_SESSION['user_id'] = 1;
        
        
    }else{
        session_start();
        session_destroy();
        $resuesta_acceso = ["status"=> 'no'];
    }

    echo json_encode($resuesta_acceso);

?>