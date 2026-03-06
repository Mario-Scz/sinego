<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'], $input['id_factura'], $input['cliente'], $input['descripcion'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {

$stmt = $pdo->prepare("UPDATE facturas SET id_factura=?, cliente=?, descripcion=? WHERE id=?");
$stmt->execute([$input['id_factura'],$input['cliente'],$input['descripcion'],$input['id']]);

echo json_encode(['success'=>true]);

}catch(PDOException $e){

echo json_encode(['error'=>$e->getMessage()]);

}