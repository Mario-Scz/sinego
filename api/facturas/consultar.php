<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? '';

try {

if($buscar){

$stmt = $pdo->prepare("SELECT * FROM facturas WHERE id_factura LIKE ? OR cliente LIKE ?");
$stmt->execute(["%$buscar%","%$buscar%"]);

}else{

$stmt = $pdo->query("SELECT * FROM facturas ORDER BY id DESC");

}

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

}catch(PDOException $e){

echo json_encode(['error'=>$e->getMessage()]);

}