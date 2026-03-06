<?php
$pageTitle = 'Imprenta';
session_start();

$_SESSION['usuario'] = "admin";
$_SESSION['rol'] = "admin";

if (empty($_SESSION['usuario']) || $_SESSION['rol'] !== 'admin') {
    header('Location: /vistas/register.php');
    exit;
}

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Imprenta - Sinego</title>
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
<h1 class="ht">Gestión de Imprenta</h1>
<p class="hs">Administra los registros de imprenta</p>
</div>
</section>

<!-- MAIN -->
<main class="c">
<section class="ts">
<div class="te">
<h2>Lista de Imprenta</h2>
<a href="/vistas/imp-add.php">
<button class="b bp">+ Nuevo Registro</button>
</a>
</div>

<div class="bb">
<input type="text" id="buscarImprenta" placeholder="Buscar por autor, tipo o ID..." class="ib">
</div>

<div class="tw">
<table class="td">
<thead>
<tr>
<th>ID</th>
<th>Autor</th>
<th>Tipo</th>
<th>ID Libro</th>
<th>Acciones</th>
</tr>
</thead>

<tbody id="tablaImprenta">
<?php while($registro = $resultado->fetch()): ?>
<tr data-id="<?php echo $registro['id']; ?>">
<td data-label="ID"><?php echo $registro['id']; ?></td>
<td data-label="Autor"><input type="text" class="autor" value="<?php echo $registro['autor']; ?>"></td>
<td data-label="Tipo"><input type="text" class="tipo" value="<?php echo $registro['tipo']; ?>"></td>
<td data-label="ID Libro"><input type="text" class="idlibro" value="<?php echo $registro['id_libro']; ?>"></td>
<td data-label="Acciones">
<div class="ba">
<button class="ba editar">✏️</button>
<button class="ba guardar" style="display:none;">💾</button>
<button class="ba eliminar">🗑️</button>
</div>
</td>
</tr>
<?php endwhile; ?>
</tbody>

</table>
</div>
</section>
</main>

<!-- FOOTER -->
<footer class="ft">
<div class="ftc">
<p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
<p>Gestión profesional de imprenta.</p>
</div>
</footer>

<script src="/js/common.js"></script>
<script src="/js/imprenta.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>