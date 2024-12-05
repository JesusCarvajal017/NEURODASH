<?php
    require '../../../model/db/cxion.php'; 
    require '../../../crud/inserts/juego/salasIns.php';
    require '../../../crud/querys/usuer/info_user.php';

    session_start(); 

    $controlador_sys = new  SalaInst();
    $user_sys = new Data_user();
    
    // generador de token
    function generarToken() {
        return str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    };
    
    // codigo valido, se encarga de no duplicado en la db
    function codigoValido(){
        global $controlador_sys;
        do{
            $token = generarToken();      
            $validation_token = $controlador_sys->idValidoSala($token);
        }while($validation_token == 1);

        return $token;
    }

    function tokenVlaSalaa(){
        global $controlador_sys;
        do{
            $token = generarToken();      
            $validation_token = $controlador_sys->tokenVlaSala($token);
        }while($validation_token == 1);

        return $token;
    }

    $id_user = $_SESSION['id_user'];

    if(!$user_sys->salaActive($id_user) == 1){
        $info = file_get_contents("php://input");
        $data_pre_create = json_decode($info, true);
        $token_sala = codigoValido();
    
        $controlador_sys->setIdJugador($data_pre_create['id_user']);
        $controlador_sys->setIdSala($token_sala);
        $controlador_sys->setTokenSala(tokenVlaSalaa());
        $controlador_sys->setCntJugadores($data_pre_create['jugadores']);
        $controlador_sys->setModoJuego($data_pre_create['modoJuego']);
        $controlador_sys->setNivelesJuego($data_pre_create['nivelJuego']);

        if($data_pre_create['tematica'] == ""){
            $tematica = 0;
        }else{
            $tematica = $data_pre_create['tematica'];
        }

        $controlador_sys->setItemsId($tematica);
    
        $controlador_sys->createSala();
    }else{
        echo "El usuario tiene una sala activa";
    }
?>