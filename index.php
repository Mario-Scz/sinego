<?php
session_start();

// Si ya está logueado, redirigir al panel
if (isset($_SESSION['usuario_id'])) {
    header("Location: vistas/administrar.php");
    exit();
}

// Si no está logueado, enviar al login
header("Location: vistas/register.php");
exit();