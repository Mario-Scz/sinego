<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$unidades = $_POST['unidades'] ?? '';
$paginas = $_POST['paginas'] ?? '';
$tipo_impresion = $_POST['tipo_impresion'] ?? '';
$material = $_POST['material'] ?? '';

$mail = new PHPMailer(true);

try{

$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'mroberto.drako@gmail.com';
$mail->Password = 'uxhheptjpgmcvxif';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->Timeout = 10;

$mail->setFrom('mroberto.drako@gmail.com','Formulario Sinego');
$mail->addAddress('mroberto.drako@gmail.com');

$mail->isHTML(true);
$mail->Subject = "Nueva cotización";

$mail->Body = "
<h2>Nueva solicitud</h2>
<b>Unidades:</b> $unidades <br>
<b>Páginas:</b> $paginas <br>
<b>Tipo:</b> $tipo_impresion <br>
<b>Material:</b> $material
";

$mail->send();

echo "<span style='color:green;'>Formulario enviado correctamente ✔</span>";

}catch(Exception $e){

echo "<span style='color:red;'>Error al enviar: ".$mail->ErrorInfo."</span>";

}