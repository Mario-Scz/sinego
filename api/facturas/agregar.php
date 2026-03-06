<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id_factura'], $input['cliente'], $input['descripcion'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {

$stmt = $pdo->prepare("INSERT INTO facturas (id_factura, cliente, descripcion) VALUES (?, ?, ?)");
$stmt->execute([$input['id_factura'], $input['cliente'], $input['descripcion']]);

echo json_encode(['success'=>true,'id'=>$pdo->lastInsertId()]);

} catch(PDOException $e){

echo json_encode(['error'=>$e->getMessage()]);

}