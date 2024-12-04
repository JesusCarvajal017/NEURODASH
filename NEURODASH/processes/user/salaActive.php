<?php
    require '../../model/db/cxion.php';
    require '../../crud/querys/usuer/info_user.php';
    require '../../crud/querys/juego/salas.php';

    session_start(); 

    $sys_data = new Data_user();
    $sys_sala = new Salas();

    if(isset($_SESSION['id_user'])){
        $id_user = $_SESSION['id_user'];

        $temp_data_active = $sys_data->salaActive($id_user);
        if(!empty($temp_data_active)){
            header('Content-Type: application/json');
            $id_sala = $temp_data_active[0]['id_sala'];
            $data_normalice = $sys_sala->jugadoresSla($id_sala);

            // organizacion de informacion de informacion del jugador
            if(!empty($data_normalice)){
                foreach($data_normalice as $fila){
                    $json_data_jugadores[] = [
                        "tipo_usuer" => $fila['sla_creater'],
                        "user_name"=> $fila['user_name'],
                        "user_exp"=> $fila['user_exp'],
                        "img_avatar"=> $fila['img_avatar'],
                        "user_id"=> $fila['user_id']
                        // "sla_jug_id"
                    ];
                };
            }else{
                $json_data_jugadores = [];
            }

            foreach($temp_data_active as $fila){
                $json_data_sala[] = [
                    "cfg_salaid" => $fila['cfg_salaid'],
                    "cfg_cantidadjugadores" => $fila['cfg_cantidadjugadores'],
                    "items_id" => $fila['items_id'],
                    "mdo_nombre" => $fila['mdo_nombre'],
                    "mdo_id " => $fila['mdo_juegoid'],
                    "nvel_nombre" => $fila['nvel_nombre'],
                    "nvel_id" => $fila['nvel_id'],
                    "sla_token" => $fila['sla_token'],
                    "user_name" => $fila['user_name'],
                    "sla_estado" => $fila['sla_estado'],
                    "id_sala" => $fila['id_sala'],
                    "jugadores" => $fila['jugadores'],
                    "salaJugadores" => $json_data_jugadores
                ];
            };

            echo json_encode($json_data_sala);
            exit;
        }else{
            echo 'No hay sala activa para el usuario :)';
            exit;
        };
    }else{
        echo 'Usuario no ha iniciado session :(';
    }
?>