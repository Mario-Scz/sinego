<?php

header("Content-Type: application/json");

require_once "../../config/db.php";

try{

$sql = "SELECT * FROM clientes ORDER BY id DESC";

$stmt = $pdo->query($sql);

$clientes = $stmt->fetchAll();

echo json_encode($clientes);

}catch(PDOException $e){

echo json_encode([]);

}