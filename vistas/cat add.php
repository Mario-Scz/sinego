<?php
$pageTitle = 'Catálogo agregar';
session_start();
if (empty($_SESSION['usuario'])) {
    header('Location: /vistas/register.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Libro - Sinego</title>
    <link rel="stylesheet" href="/css/cat add.css">
</head>
<body>
<!--
barra de navegación
-->
<nav class="n">
  <div class="nc">
    <div class="nl">
      <a href="/vistas/bienvenido.php">
        <img src="/img/sinego.png" alt="Sinego Logo" class="lg" />
      </a>
    </div>
    <input type="checkbox" id="cm" class="cm" />
    <label for="cm" class="tm">
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
<!--
sección dstacada
-->
<section class="d2">
  <div class="cd">
    <h1 class="td2">Agregar Nuevo Libro</h1>
    <p class="sd">Crea un nuevo registro en el catálogo</p>
  </div>
</section>

<!--
contenido principal (formulario libro)
-->
<main class="c">
  <section class="fs">
    <div class="ac">
      <h2>Información del Libro</h2>
      <form class="fm">
        <div class="fg">
          <label for="idL">ID del Libro</label>
          <input type="text" id="idL" placeholder="Ej: LIB001" required />
        </div>

        <div class="fg">
          <label for="aut">Autor</label>
          <input type="text" id="aut" placeholder="Nombre del autor" required />
        </div>

        <div class="fg">
          <label for="libro">Título del Libro</label>
          <input type="text" id="libro" placeholder="Título de la obra" required />
        </div>

        <div class="fg">
          <label for="tp">Tipo de Libro</label>
          <input type="text" id="tp" placeholder="Ej: Novela, Cuento, Clásico..." required />
        </div>

        <div class="fa">
          <a href="catalog.html"><button type="button" class="b bs">Cancelar</button></a>
          <button type="submit" class="b bp">Agregar Libro</button>
        </div>
      </form>
    </div>
  </section>
</main>
<!--
pie de página
-->
<footer class="ft">
  <div class="ftc">
    <p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
  </div>
</footer>

<script src="/js/common.js"></script>
<script src="/js/cat-add.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>
</body>
</html>