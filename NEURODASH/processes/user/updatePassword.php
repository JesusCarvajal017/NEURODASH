<?php 
    session_start();
    require '../../model/db/cxion.php';
    require '../../crud/updates/user/user.php';
    
    $data_usuario = new UpdataUser();
    
    $password_new = $_POST['passwordUser']; 
    
    // estableciendo los valores antes de la ejecucion
    // $data_usuario->setPassword($password_new);
    // $data_usuario->setId($_SESSION['temp_id_recuperacion']); 


    // actualizacion
    $data_usuario->passwordNew($_SESSION['temp_id_recuperacion'],$password_new);

    session_unset();
    session_destroy(); 

    header('Location: ../../views/forms/login.html');

?>