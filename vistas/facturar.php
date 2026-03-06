<?php
$pageTitle = 'Facturación';
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
<title>Facturación - Sinego</title>
<link rel="stylesheet" href="/css/facturar.css">
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
<h1 class="ht">Facturación</h1>
<p class="hs">Gestiona tus facturas</p>
</div>
</section>

<main class="c">

<section class="ts">

<div class="te">
<h2>Facturas Emitidas</h2>

<a href="/vistas/fac-add.php">
<button class="b bp">+ Nueva Factura</button>
</a>

</div>

<div class="bb">
<input type="text" id="buscarFactura" placeholder="Buscar factura..." class="ib">
</div>

<div class="tw">

<table class="td">

<thead>
<tr>
<th>ID</th>
<th>ID Factura</th>
<th>Cliente</th>
<th>Descripción</th>
<th>Acciones</th>
</tr>
</thead>

<tbody id="tablaFacturas">
</tbody>

</table>

</div>

</section>

</main>

<footer class="ft">
<div class="ftc">
<p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
</div>
</footer>

<script src="/js/common.js"></script>
<script src="/js/facturar.js"></script>

</body>
</html>