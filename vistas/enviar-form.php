<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

$unidades = $_POST['unidades'] ?? '';
$paginas = $_POST['paginas'] ?? '';
$tipo_impresion = $_POST['tipo_impresion'] ?? '';
$material = $_POST['material'] ?? '';

$to = "mroberto.drako@gmail.com"; // TU CORREO
$subject = "Nueva cotización - Sinego";

$message = "
Nueva solicitud de cotización

Unidades: $unidades
Páginas: $paginas
Tipo de impresión: $tipo_impresion
Material: $material
";

$headers = "From: Sinego <mroberto.drako@gmail.com>\r\n";
$headers .= "Reply-To: mroberto.drako@gmail.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if(mail($to,$subject,$message,$headers)){
    header("Location: imprenta.php?success=1");
}else{
    header("Location: imprenta.php?error=1");
}

exit;

}

?>