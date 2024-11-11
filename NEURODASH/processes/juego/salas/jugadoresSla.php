<?php
    require '../../../model/db/cxion.php';
    require '../../../crud/querys/juego/salas.php';
    
    $file = file_get_contents("php://input");
    $data_sala = json_decode($file, true);
    
    $sys_salas = new Salas();

    $data_normalice = $sys_salas->jugadoresSla($data_sala["id_sala"]);

    foreach($data_normalice as $fila){
        $json_data_sala[] = [
            "name" => $fila['user_name'],
            "imageUser" => $fila['user_avatar'],
            "id" => $fila['user_id'],
        ];

        
            //     name: "Jugador 1",
            //     image: "../../assets/img/avatars/avatar2.png",
            //     puntos: 1500,
            //     puntosMax: 2000,
            //     bonos: 6,
            //     liga: "oro",
            //   },
    };

    header('Content-Type: application/json');
    echo json_encode($json_data_sala);

?>