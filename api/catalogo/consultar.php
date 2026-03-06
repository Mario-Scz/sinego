<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? '';

try {

if ($buscar != "") {

$stmt = $pdo->prepare("SELECT * FROM catalogo 
WHERE autor LIKE ? OR tipo LIKE ? OR id_libro LIKE ?");

$stmt->execute([
"%$buscar%",
"%$buscar%",
"%$buscar%"
]);

} else {

$stmt = $pdo->query("SELECT * FROM catalogo");

}

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

} catch (PDOException $e) {
echo json_encode(["error"=>$e->getMessage()]);
}