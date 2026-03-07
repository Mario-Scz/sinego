<?php
require __DIR__ . '/../config/session_check.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo - Sinego</title>
    <link rel="stylesheet" href="/css/catalogo.css">
</head>
<body>

<!-- NAV -->
<nav class="n">
  <div class="nc">
    <div class="nl">
      <a href="/vistas/bienvenido.php">
        <img src="/img/sinego.png" alt="Sinego Logo" class="lg" />
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
        <li><a href="/vistas/catalogo.php">CATÁLOGO</a></li>
        <li><a href="/vistas/register.php">INICIAR SESIÓN</a></li>
        <li><a href="/vistas/menu.php">MENÚ</a></li>
      </ul>
    </nav>
    <div class="ni">
      <a href="/vistas/cart.php" class="ic" title="Carrito">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cc" id="cc">0</span>
      </a>
      <a href="/vistas/favorites.php" class="ic" title="Favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span class="cf" id="cf">0</span>
      </a>
    </div>
  </div>
</nav>

<!-- HERO -->
<section class="h">
  <div class="hc">
    <h1 class="ht">Nuestro Catálogo</h1>
    <p class="hs">Explora nuestra colección de productos y servicios</p>
  </div>
</section>

<!-- CONTENIDO PRINCIPAL -->
<main class="c">
  <div class="cl2">

    <!-- SIDEBAR DE FILTROS -->
    <aside class="fs2">
      <h3>Filtros</h3>
      <div class="fg2">
        <h4>Géneros</h4>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Comedia</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Drama</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Terror</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Romance</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Filosofía</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Infantil</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Fantasía</span>
        </label>
      </div>
    </aside>

    <!-- GRID DE PRODUCTOS -->
    <section class="ps">
      <!-- BARRA DE BÚSQUEDA -->
      <div class="bb">
        <input type="text" placeholder="Buscar productos..." class="ib">
      </div>

      <!-- GRID DE LIBROS (Aquí se insertan dinámicamente) -->
      <div class="pg">
        <!-- Los libros se cargarán aquí con JavaScript -->
      </div>
    </section>

  </div>
</main>

<!-- FOOTER -->
<footer class="ft">
  <div class="ftc">
    <p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
    <p>Tu tienda de productos impresos de calidad.</p>
  </div>
</footer>

<!-- SCRIPTS -->
<script src="/js/common.js"></script>
<script src="/js/catalogo.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>

</body>
</html>