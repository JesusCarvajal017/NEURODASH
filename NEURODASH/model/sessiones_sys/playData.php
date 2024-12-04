<?php
    require '../db/cxion.php';
    require '../../crud/querys/juego/juego.php';
    require '../../crud/querys/juego/salas.php';

    session_start();

    $data_sys = new JuegoData();

    if(isset($_SESSION['user_sala_validation'])){
       if(!isset($_SESSION['start_sala'])){ 
            $data_sala = $data_sys->salavigenMin($_SESSION['user_sala_validation']);
        
            $info_play = $data_sys->dataJuegoEjecu($data_sala[0]['mdo_id'],$data_sala[0]['nvl_id']);

            $time_display = getMinutesAndSeconds($info_play[0]['dfi_tiempovista']);
            $time_response =  getMinutesAndSeconds($info_play[0]['dfi_tiemporespuesta']);

            for($i = 0; $i < $info_play[0]['dfi_rodas']; $i++){
                if($data_sala[0]['items_id'] == 0){
                    $secuencia = array_map(fn() => rand(1, 100), range(1, $info_play[0]['dfi_cantidadelemento']));
                }else{
                    $secuencia = $data_sys->dataTerminosRandom($data_sala[0]['items_id'], $info_play[0]['dfi_rodas']);
                    $secuencia = array_column($secuencia, 'nombre');
                }

                $data_json_sala[] = [
                    "id" => $i + 1,
                    "tiempos" => [
                        "tiempoVisual" => $time_display,
                        "tiempoRonda" => $time_response
                    ],
                    "secuencia" =>  $secuencia
                ];
            }
        
           $_SESSION['start_sala'] = json_encode($data_json_sala);
        
            $responde = $_SESSION['start_sala'];
        }else{
            $responde = $_SESSION['start_sala'];
        }
    
    }else{
        $responde = "Informacion de la sala no disponible";
    }

    
    // factor de conversion tiempo
    function getMinutesAndSeconds($seconds){
        return [
            'minutos' => floor($seconds / 60),
            'segundos' => $seconds % 60
        ];
    }



    // $ronda = [
    //     'id' => $i,
    //     'tiempos' => [
    //         'tiempoVisual' => $tiempoVista,
    //         'tiempoRonda' => $tiempoRespuesta
    //     ],
    //     'cantidadElementos' => $limiteSubitems,
    //     'secuencia' => $secuencia
    // ];

    header('Content-Type: application/json');
    echo $responde;

    // print_r($data_sala[0]['mdo_id']);




?>