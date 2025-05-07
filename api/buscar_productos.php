<?php
header('Content-Type: application/json');
include __DIR__ . '/db.php';

$nombre = $_GET['nombre'] ?? '';
$categoria = $_GET['categoria'] ?? '';

$sql = "SELECT p.* FROM productos p
        INNER JOIN categorias_prod c ON p.FK_ID_CATEGORIA = c.ID_CATEGORIA
        WHERE p.NOMBRE_PRODUCTO LIKE :nombre";

$params = [':nombre' => "%$nombre%"];

if (!empty($categoria)) {
    $sql .= " AND c.NOMBRE_CATEGORIA = :categoria";
    $params[':categoria'] = $categoria;
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

$productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($productos);
?>
