<?php
// Configuración de conexión a PostgreSQL
$host = "localhost";
$dbname = "neurodash";
$user = "postgres";
$password = "123456";

try {
    // Conectar a la base de datos
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener los avatares
    $query = $conn->query("SELECT id_avatar, img_avatar FROM avatars");
    $avatars = $query->fetchAll(PDO::FETCH_ASSOC);

    // Enviar los datos como JSON
    header('Content-Type: application/json');
    echo json_encode($avatars);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
