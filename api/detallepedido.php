<?php
require_once 'db.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    // Leer el body de la petición
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id_producto']) || !isset($data['cantidad'])) {
        echo json_encode(["success" => false, "message" => "Datos incompletos"]);
        exit;
    }

    $idProducto = $data['id_producto'];
    $cantidad = $data['cantidad'];

    // Obtener el precio del producto
    $stmt = $pdo->prepare("SELECT PRECIO FROM productos WHERE ID_PRODUCTO = :id");
    $stmt->execute([':id' => $idProducto]);
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$producto) {
        echo json_encode(["success" => false, "message" => "Producto no encontrado"]);
        exit;
    }

    $precioUnidad = $producto['PRECIO'];
    $subtotal = $precioUnidad * $cantidad;

    // Insertar en detallepedido
    $stmt = $pdo->prepare("INSERT INTO detalle_pedido (ID_DETALLE, FK_ID_PRODUCTO, CANTIDAD,  SUBTOTAL, FK_ID_PEDIDO) 
    VALUES (:id_detalle, :fk_id_producto, :cantidad, :subtotal, 'pendiente')");

    // $idDetalle = uniqid('det-'); // puedes cambiar por otro método si prefieres

    $stmt->execute([
        ':id_detalle' => $idDetalle,
        ':fk_id_producto' => $idProducto,
        ':cantidad' => $cantidad,
        ':precio_unidad' => $precioUnidad,
        ':subtotal' => $subtotal
    ]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
