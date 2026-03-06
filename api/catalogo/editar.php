<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'], $input['autor'], $input['tipo'], $input['id_libro'])) {
    echo json_encode(["error"=>"Datos incompletos"]);
    exit;
}

try {

$stmt = $pdo->prepare("UPDATE catalogo 
SET autor=?, tipo=?, id_libro=? 
WHERE id=?");

$stmt->execute([
$input['autor'],
$input['tipo'],
$input['id_libro'],
$input['id']
]);

echo json_encode(["success"=>true]);

} catch(PDOException $e){

echo json_encode(["error"=>$e->getMessage()]);

}