<?php
// detalle_producto.php - Obtener detalles de un solo producto por nombre
require_once 'db.php';
header('Content-Type: application/json');

try {
    if (!isset($_GET['nombre'])) {
        throw new Exception("Nombre de producto no proporcionado");
    }

    $nombre = $_GET['nombre'];

    $sql = "SELECT ID_PRODUCTO, NOMBRE_PRODUCTO, DESCRIPCION_PRODUCTO, PRECIO
            FROM productos
            WHERE NOMBRE_PRODUCTO = :nombre
            LIMIT 1";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':nombre' => $nombre]);
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$producto) {
        echo json_encode(null);
    } else {
        echo json_encode($producto);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>