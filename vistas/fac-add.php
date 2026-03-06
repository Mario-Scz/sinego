<?php
$pageTitle = 'Agregar Factura';
session_start();

$_SESSION['usuario'] = "admin";
$_SESSION['rol'] = "admin";

if (empty($_SESSION['usuario']) || $_SESSION['rol'] !== 'admin') {
    header('Location: /vistas/register.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Agregar Factura</title>
<link rel="stylesheet" href="/css/fac add.css">
</head>

<body>

<nav class="n">
<div class="nc">
<div class="nl">
<a href="/vistas/bienvenido.php">
<img src="/img/sinego.png" class="lg">
</a>
</div>
</div>
</nav>

<section class="h">
<div class="hc">
<h1 class="ht">Agregar Factura</h1>
<p class="hs">Registrar nueva factura</p>
</div>
</section>

<main class="c">

<section class="fs">

<div class="ac">

<h2>Datos de la Factura</h2>

<form id="formFactura" class="fm">

<div class="fg">
<label>ID Factura</label>
<input type="text" id="id_factura" required>
</div>

<div class="fg">
<label>Cliente</label>
<input type="text" id="cliente" required>
</div>

<div class="fg">
<label>Descripción</label>
<input type="text" id="descripcion" required>
</div>

<div class="fa">

<a href="/vistas/facturar.php">
<button type="button" class="b bs">Cancelar</button>
</a>

<button type="submit" class="b bp">Agregar Factura</button>

</div>

</form>

</div>

</section>

</main>

<script src="/js/fac-add.js"></script>

</body>
</html>