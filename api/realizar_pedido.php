<?php
require_once 'db.php';
require_once 'pedido.php';

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$carrito = $data['carrito'] ?? [];
$preferencias = $data['preferencias'] ?? '';
$metodo_pago = $data['metodo_pago'] ?? '';
$total = $data['total'] ?? 0;

if (count($carrito) === 0) {
  echo json_encode(['success' => false, 'message' => 'El carrito está vacío']);
  exit;
}

if (!$metodo_pago) {
  echo json_encode(['success' => false, 'message' => 'Falta seleccionar el método de pago']);
  exit;
}
$idPedido = 'ped-' . time() ;
try {
  $pdo->beginTransaction();

  $stmtPedido = $pdo->prepare("INSERT INTO pedido (ID_PEDIDO, TOTAL_PEDIDO, FECHA_PEDIDO, PREFERENCIAS_PEDIDO, METODO_PAGO)
                               VALUES (:id, :total, NOW(), :preferencias, :metodo_pago)");
  $stmtPedido->execute([
    ':id' => $idPedido,
    ':total' => $total,
    ':preferencias' => $preferencias,
    ':metodo_pago' => $metodo_pago
  ]);

  $stmtDetalle = $pdo->prepare("
  INSERT INTO detalle_pedido 
  (ID_DETALLE_PEDIDO, FK_ID_PEDIDO, FK_ID_PRODUCTO, CANTIDAD, SUBTOTAL)
  VALUES 
  (:id_detalle, :id_pedido, :id_producto, :cantidad, :subtotal)
");

foreach ($carrito as $index => $item) {
  $idDetalle = "grupo-" . time() . "-" . $index;

  $stmtDetalle->execute([
    ':id_detalle'   => $idDetalle,
    ':id_pedido'    => $idPedido,
    ':id_producto'  => $item['id'],
    ':cantidad'     => $item['cantidad'],
    ':subtotal'     => $item['subtotal']
  ]);
}

  $pdo->commit();

    echo json_encode(['success' => true, 'id_pedido' => $idPedido]);
} catch (PDOException $e) {
  $pdo->rollBack();
  echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
