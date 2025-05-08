<?php
include 'db.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Se requiere ID de pedido"]);
    exit;
}

$id_pedido = $conexion->real_escape_string($_GET['id']);

if (!preg_match('/^ped-\d+$/', $id_pedido)) {
    http_response_code(400);
    echo json_encode(["error" => "Formato de ID inválido"]);
    exit;
}

$query = "
    SELECT 
        p.ID_PEDIDO,
        p.FECHA_PEDIDO,
        p.TOTAL_PEDIDO,
        pr.ID_PRODUCTO,
        pr.NOMBRE_PRODUCTO,
        pr.PRECIO,
        pp.CANTIDAD,
        (pr.PRECIO * pp.CANTIDAD) AS SUBTOTAL
    FROM pedido p
    JOIN pedidoproductos pp ON p.ID_PEDIDO = pp.ID_PEDIDO
    JOIN productos pr ON pp.ID_PRODUCTO = pr.ID_PRODUCTO
    WHERE p.ID_PEDIDO = ?
    ORDER BY pr.NOMBRE_PRODUCTO
";

$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $id_pedido);
$stmt->execute();
$result = $stmt->get_result();

$detalle = [
    "pedido" => null,
    "productos" => []
];

while ($row = $result->fetch_assoc()) {
    if (!$detalle['pedido']) {
        $detalle['pedido'] = [
            "id" => $row['ID_PEDIDO'],
            "fecha" => $row['FECHA_PEDIDO'],
            "total" => $row['TOTAL_PEDIDO']
        ];
    }
    
    $detalle['productos'][] = [
        "id" => $row['ID_PRODUCTO'],
        "nombre" => $row['NOMBRE_PRODUCTO'],
        "precio" => $row['PRECIO'],
        "cantidad" => $row['CANTIDAD'],
        "subtotal" => $row['SUBTOTAL']
    ];
}

if (!$detalle['pedido']) {
    http_response_code(404);
    echo json_encode(["error" => "Pedido no encontrado"]);
    exit;
}

echo json_encode($detalle);
?>