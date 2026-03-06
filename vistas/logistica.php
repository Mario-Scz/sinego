<?php
$pageTitle = 'Logística';
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
<title>Logística - Sinego</title>
<link rel="stylesheet" href="/css/logistica.css">
</head>

<body>

<nav class="n">
<div class="nc">

<div class="nl">
<a href="/vistas/bienvenido.php">
<img src="/img/sinego.png" alt="Sinego Logo" class="lg"/>
</a>
</div>

<input type="checkbox" id="mchk" class="cm"/>

<label for="mchk" class="tm">
<span></span>
<span></span>
<span></span>
</label>

<nav class="mn">
<ul>
<li><a href="/vistas/bienvenido.php">INICIO</a></li>
<li><a href="/vistas/imprenta.php">IMPRENTA</a></li>
<li><a href="/vistas/catalogo.php">CATALOGO</a></li>
<li><a href="/vistas/register.php">INICIAR SESIÓN</a></li>
<li><a href="/vistas/menu.php">MENÚ</a></li>
</ul>
</nav>

<div class="ni">

<a href="/vistas/cart.php" class="ic">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<circle cx="9" cy="21" r="1"></circle>
<circle cx="20" cy="21" r="1"></circle>
<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
</svg>
<span class="cc" id="cc">0</span>
</a>

<a href="/vistas/favorites.php" class="ic">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>
<span class="cf" id="cf">0</span>
</a>

</div>
</div>
</nav>

<section class="h">
<div class="hc">
<h1 class="ht">Logística</h1>
<p class="hs">Gestiona tus envíos y distribuciones</p>
</div>
</section>

<main class="c">

<section class="ts">

<div class="te">
<h2>Envíos y Entregas</h2>
<a href="log add.php">
<button class="b bp">+ Nuevo Envío</button>
</a>
</div>

<div class="bb">
<input type="text" id="buscarEnvio" placeholder="Buscar envío por autor o ID de libro..." class="ib">
</div>

<div class="tw">

<table class="tab-dat td">

<thead>
<tr>
<th>Autor</th>
<th>Tipo de Envío</th>
<th>ID Libro</th>
<th>Acciones</th>
</tr>
</thead>

<tbody id="tablaEnvios">
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
<script src="/js/logistica.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>