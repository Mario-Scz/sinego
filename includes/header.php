<?php
// header.php
// Reutiliza la cabecera y la navegación. Asegúrate de ajustar las rutas si cambias la estructura.
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sinego - <?php echo $pageTitle ?? 'Página'; ?></title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/register.css">
</head>
<body>
<nav class="n">
  <div class="nc">
    <div class="nl">
      <a href="/vistas/bienvenido.php">
        <img src="../img/sinego.png" alt="Sinego Logo" class="lg" />
      </a>
    </div>
 <input type="checkbox" id="mchk" class="cm" />
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
      <a href="/vistas/cart.php" class="ic" title="Carrito">
        <!-- ícono carrito -->
      </a>
      <a href="/vistas/favorites.php" class="ic" title="Favoritos">
        <!-- ícono favoritos -->
      </a>
    </div>
  </div>
</nav>
