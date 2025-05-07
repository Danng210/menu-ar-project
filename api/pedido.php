<?php
// pedido.php - Insertar un nuevo pedido
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once 'db.php';

// Leer el JSON del cuerpo
$input = json_decode(file_get_contents('php://input'), true);

$carrito = $input['carrito'] ?? [];
$preferencias = $input['preferencias'] ?? '';
$metodoPago = $input['metodo_pago'] ?? '';
$total = $input['total'] ?? 0;

if (empty($carrito)) {
    echo json_encode(['success' => false, 'message' => 'Carrito vacío']);
    exit;
}

function crearPedido($total, $preferencias, $metodoPago) {
    global $pdo;

    // $idPedido = 'ped-' . time() ;
    // $ultimoPedido = $pdo->query("SELECT COUNT(*) AS total FROM pedido")->fetch();
    // $contador = $ultimoPedido['total'] + 1;
    // $idPedido = 'ped-' . $contador;

    $sql = "INSERT INTO pedido (ID_PEDIDO, FECHA_PEDIDO, TOTAL_PEDIDO, PREFERENCIAS_PEDIDO, METODO_PAGO) 
            VALUES (:id_pedido, NOW(), :total, :preferencias, :metodo_pago)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id_pedido' => $idPedido,
        ':total' => $total,
        ':preferencias' => $preferencias,
        ':metodo_pago' => $metodoPago
    ]);

    return $idPedido;
}

?>