<?php
$pageTitle = 'Administración';
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
<title>Administración de Usuarios - Sinego</title>
<link rel="stylesheet" href="/css/administrar.css">
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
<h1 class="ht">Administración de Usuarios</h1>
<p class="hs">Gestiona los usuarios del sistema</p>
</div>
</section>

<!-- MAIN -->
<main class="c">

<section class="ts">

<div class="te">

<h2>Lista de Usuarios</h2>

<a href="/vistas/adm agregar.php">
<button class="b bp">+ Nuevo Usuario</button>
</a>

</div>

<div class="bb">
<input type="text" id="buscarUsuario" placeholder="Buscar usuario..." class="ib">
</div>

<div class="tw">

<table class="td">

<thead>

<tr>
<th>ID</th>
<th>Usuario</th>
<th>Acciones</th>
</tr>

</thead>

<tbody id="tablaUsuarios">
<!-- JavaScript insertará los usuarios -->
</tbody>

</table>

</div>

</section>

</main>

<!-- FOOTER -->

<footer class="ft">

<div class="ftc">

<p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
<p>Panel administrativo del sistema.</p>

</div>

</footer>

<script src="/js/common.js"></script>
<script src="/js/administrar.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>