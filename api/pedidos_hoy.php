<?php
require_once 'db.php';
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    $stmt = $pdo->query("SELECT ID_PEDIDO FROM pedido WHERE DATE(FECHA_PEDIDO) = CURDATE() ORDER BY FECHA_PEDIDO ASC");
    $pedidos = $stmt->fetchAll(PDO::FETCH_COLUMN); // devuelve solo los IDs

    echo json_encode([
        'success' => true,
        'pedidos' => $pedidos,
        'cantidad' => count($pedidos)
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
