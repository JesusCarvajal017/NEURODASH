<?php
    header('Content-type:application/json');
    require '../db/cxion.php';
    // Base de datos (NUZIT)
    $conexionDb = new Conexion();

    // sentecias sql
    $sql_dificultades = "SELECT dfi_id, mdo_nombre, nvel_nombre, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento
                        FROM entrenamiento.dificultadentrenamiento

                        INNER JOIN entrenamiento.modojuego
                        ON dificultadentrenamiento.mdo_juegoid = modojuego.mdo_juegoid

                        INNER JOIN entrenamiento.niveles
                        ON dificultadentrenamiento.nvel_id = niveles.nvel_id";

    // ejecucion sql
    $dificultades = $conexionDb->consultar($sql_dificultades);


    foreach($dificultades as $fila){
        $data_dificultades[] = [
            "dfi_id" => $fila["dfi_id"],
            "mdo_nombre" => $fila["mdo_nombre"],
            "nvel_nombre" => $fila["nvel_nombre"], 
            "dfi_tiempovista" => $fila["dfi_tiempovista"],  
            "dfi_tiemporespuesta" => $fila["dfi_tiemporespuesta"],  
            "dfi_cantidadelemento" => $fila["dfi_cantidadelemento"],  
        ]; 
    }

    echo json_encode($data_dificultades);
?>