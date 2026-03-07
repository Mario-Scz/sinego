<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $unidades = $_POST['unidades'];
    $paginas = $_POST['paginas'];
    $tipo_impresion = $_POST['tipo_impresion'];
    $material = $_POST['material'];

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mroberto.drako@gmail.com'; // Tu correo
        $mail->Password   = 'uxhh eptj pgmc vxif';    // Contraseña de aplicación
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('mroberto.drako@gmail.com', 'Sinego Imprenta');
        $mail->addAddress('gustav.arsene@gmail.com'); // correo receptor

        $mail->isHTML(true);
        $mail->Subject = 'Nueva Cotización de Imprenta';
        $mail->Body    = "
            <h3>Nueva solicitud de cotización:</h3>
            <p><strong>Unidades:</strong> $unidades</p>
            <p><strong>Páginas:</strong> $paginas</p>
            <p><strong>Tipo de impresión:</strong> $tipo_impresion</p>
            <p><strong>Material:</strong> $material</p>
        ";

        $mail->send();

        header("Location: /vistas/imprenta.php?success=1");
        exit;

    } catch (Exception $e) {
        header("Location: /vistas/imprenta.php?error=1");
        exit;
    }
}
?>