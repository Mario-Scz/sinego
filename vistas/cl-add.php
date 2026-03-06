<?php
$pageTitle = 'Agregar clientes';
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
<title>Agregar Cliente - Sinego</title>
<link rel="stylesheet" href="/css/cl add.css">
</head>

<body>

<!-- nav -->
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
<h1 class="ht">Agregar Nuevo Cliente</h1>
<p class="hs">Registra un nuevo cliente en tu base de datos</p>
</div>
</section>

<main class="c">

<section class="fs">

<div class="ac">

<h2>Información del Cliente</h2>

<form id="formCliente" class="fm" method="POST" action="/controladores/agregarCliente.php">

<div class="fg">
<label for="nombre">Nombre Completo</label>
<input type="text" id="nombre" name="nombre" placeholder="Nombre del cliente" required>
</div>

<div class="fg">
<label for="telefono">Teléfono</label>
<input type="text" id="telefono" name="telefono" placeholder="Número de teléfono" required>
</div>

<div class="fg">
<label for="correo">Correo Electrónico</label>
<input type="email" id="correo" name="correo" placeholder="Correo del cliente" required>
</div>

<div class="fa">

<a href="/vistas/cliente.php">
<button type="button" class="b bs">Cancelar</button>
</a>

<button type="submit" class="b bp">Agregar Cliente</button>

</div>

</form>

</div>

</section>

</main>

<footer class="ft">
<div class="ftc">
<p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
</div>
</footer>

<script src="/js/common.js"></script>
<script src="/js/cl-add.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>