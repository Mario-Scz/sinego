<?php
$pageTitle = 'Clientes';
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
<title>Clientes - Sinego</title>
<link rel="stylesheet" href="/css/cliente.css">
</head>

<body>

<!-- NAV -->
<nav class="n">
<div class="nc">

<div class="nl">
<a href="/vistas/bienvenido.php">
<img src="/img/sinego.png" class="lg">
</a>
</div>

</div>
</nav>

<!-- HERO -->
<section class="h">
<div class="hc">
<h1 class="ht">Gestión de Clientes</h1>
<p class="hs">Administra tu base de clientes</p>
</div>
</section>

<!-- MAIN -->
<main class="c">

<section class="ts">

<div class="te">

<h2>Lista de Clientes</h2>

<a href="/vistas/cl-add.php">
<button class="b bp">+ Nuevo Cliente</button>
</a>

</div>

<div class="bb">
<input type="text" id="buscarCliente" placeholder="Buscar cliente por nombre o correo..." class="ib">
</div>

<div class="tw">

<table class="td">

<thead>

<tr>
<th>ID</th>
<th>Nombre</th>
<th>Teléfono</th>
<th>Correo</th>
<th>Acciones</th>
</tr>

</thead>

<tbody id="tablaClientes">
<!-- Aquí JavaScript insertará los clientes -->
</tbody>

</table>

</div>

</section>

</main>

<!-- FOOTER -->

<footer class="ft">

<div class="ftc">

<p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
<p>Gestión profesional de clientes.</p>

</div>

</footer>

<script src="/js/common.js"></script>
<script src="/js/cliente.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>