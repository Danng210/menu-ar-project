<?php
require_once 'db.php';
header('Content-Type: application/json');

// Activar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$idPedido = $_GET['id_pedido'] ?? null;

if (!$idPedido) {
  echo json_encode(['success' => false, 'message' => 'Falta ID del pedido']);
  exit;
}

try {
  // Obtener productos del pedido
  $sqlDetalle = "
    SELECT p.NOMBRE_PRODUCTO as nombre, dp.CANTIDAD as cantidad, dp.SUBTOTAL as subtotal
    FROM detalle_pedido dp
    JOIN productos p ON p.ID_PRODUCTO = dp.FK_ID_PRODUCTO
    WHERE dp.FK_ID_PEDIDO = :id_pedido
  ";
  $stmtDetalle = $pdo->prepare($sqlDetalle);
  $stmtDetalle->execute([':id_pedido' => $idPedido]);
  $productos = $stmtDetalle->fetchAll(PDO::FETCH_ASSOC);

  // Obtener total del pedido
  $stmtTotal = $pdo->prepare("SELECT TOTAL_PEDIDO FROM pedido WHERE ID_PEDIDO = :id_pedido");
  $stmtTotal->execute([':id_pedido' => $idPedido]);
  $rowTotal = $stmtTotal->fetch(PDO::FETCH_ASSOC);
  $total = $rowTotal['TOTAL_PEDIDO'] ?? 0;

  // Contar pedidos hechos hoy
  $stmtHoy = $pdo->query("SELECT COUNT(*) AS cantidad FROM pedido WHERE DATE(FECHA_PEDIDO) = CURDATE()");
  $cantidadPedidosHoy = $stmtHoy->fetch(PDO::FETCH_ASSOC)['cantidad'];

  echo json_encode([
    'success' => true,
    'productos' => $productos,
    'total' => $total,
    'numeroPedidoHoy' => $cantidadPedidosHoy
  ]);
} catch (PDOException $e) {
  echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}