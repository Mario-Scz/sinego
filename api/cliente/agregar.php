<?php

require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"];
$telefono = $data["telefono"];
$correo = $data["correo"];

$sql = "INSERT INTO clientes(nombre,telefono,correo)
        VALUES('$nombre','$telefono','$correo')";

if($conn->query($sql)){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}