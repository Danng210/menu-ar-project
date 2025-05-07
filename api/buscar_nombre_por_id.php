<?php
require_once 'db.php';
header('Content-Type: application/json');

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID no proporcionado"]);
    exit;
}

$id = $_GET['id'];

$sql = "SELECT NOMBRE_PRODUCTO FROM productos WHERE ID_PRODUCTO = :id LIMIT 1";
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    echo json_encode($result);
} else {
    echo json_encode(["error" => "Producto no encontrado"]);
}
?>
