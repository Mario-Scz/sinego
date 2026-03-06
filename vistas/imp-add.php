<?php
$pageTitle = 'Agregar imprenta';
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
<title>Agregar Producción - Sinego</title>
<link rel="stylesheet" href="/css/imp add.css">
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
<h1 class="ht">Agregar Producción de Imprenta</h1>
<p class="hs">Registra una nueva orden de producción</p>
</div>
</section>

<main class="c">
<section class="fs">
<div class="ac">
<h2>Información de Producción</h2>

<form id="formimprenta" class="fm">

<div class="fg">
<label for="idlibro">ID del Libro</label>
<input type="text" id="idlibro" name="idlibro" placeholder="Ej: IMP001" required>
</div>

<div class="fg">
<label for="autor">Autor</label>
<input type="text" id="autor" name="autor" placeholder="Nombre del autor" required>
</div>

<div class="fg">
<label for="tipo">Tipo de Impresión</label>
<input type="text" id="tipo" name="tipo" placeholder="Ej: Tapa Dura, Bolsillo, etc." required>
</div>

<div class="fa">
<a href="/vistas/imprenta2.php">
<button type="button" class="b bs">Cancelar</button>
</a>
<button type="submit" class="b bp">Agregar Producción</button>
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
<script src="/js/imp-add.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>