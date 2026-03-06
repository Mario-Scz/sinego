<?php

require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$nombre = $data["nombre"];
$telefono = $data["telefono"];
$correo = $data["correo"];

$sql = "UPDATE clientes 
        SET nombre='$nombre',
            telefono='$telefono',
            correo='$correo'
        WHERE id=$id";

if($conn->query($sql)){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}