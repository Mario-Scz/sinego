<?php

header("Content-Type: application/json");

require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? "";

if(!$id){
echo json_encode(["success"=>false]);
exit;
}

try{

$sql = "DELETE FROM clientes WHERE id=:id";

$stmt = $pdo->prepare($sql);

$stmt->execute([
":id"=>$id
]);

echo json_encode(["success"=>true]);

}catch(PDOException $e){

echo json_encode(["success"=>false]);

}