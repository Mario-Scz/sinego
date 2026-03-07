<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Imprenta - Sinego</title>
<link rel="stylesheet" href="/css/imprenta.css" />
</head>
<body>
<!-- nav -->
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

<!-- Hero Section -->
<section class="h">
  <div class="hc">
    <h1 class="ht">Servicios de Imprenta</h1>
    <p class="hs">Transforma tus ideas en productos impresos de calidad</p>
  </div>
</section>

<!-- Main Content -->
<main class="c">
  <section class="fs">
    <div class="fg">
      <div class="fi">
        <img src="/img/libro.png" alt="Imprenta" class="fi" />
      </div>
      <div class="fc">
        <h2>Cotiza tu Proyecto</h2>
        <p>Completa los siguientes datos para obtener un presupuesto personalizado</p>
        <form class="fm">
          <div class="cp">
            <label>No. de unidades</label>
            <input type="number" placeholder="Ingrese la cantidad" required />
          </div>
          <div class="cp">
            <label>Cantidad de páginas</label>
            <input type="number" placeholder="Ingrese el número de páginas" required />
          </div>
          <div class="cp">
            <label>Tipo de impresión</label>
            <select required>
              <option value="">Seleccione un tipo</option>
              <option value="blanco-negro">Blanco y Negro</option>
              <option value="color">A Color</option>
              <option value="especial">Impresión Especial</option>
            </select>
          </div>
          <div class="cp">
            <label>Material</label>
            <select required>
              <option value="">Seleccione un material</option>
              <option value="papel-bond">Papel Bond</option>
              <option value="papel-couche">Papel Couché</option>
              <option value="cartulina">Cartulina</option>
              <option value="tela">Tela</option>
            </select>
          </div>
          <button type="submit" class="b bp">Cotizar</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="ss">
    <h2>Nuestros Servicios</h2>
    <div class="sg">
      <div class="sc">
        <h3>Libros</h3>
        <p>Impresión de libros profesionales con encuadernación de calidad</p>
      </div>
      <div class="sc">
        <h3>Folletos</h3>
        <p>Folletos promocionales llamativos y de impacto visual</p>
      </div>
      <div class="sc">
        <h3>Tarjetas</h3>
        <p>Tarjetas de presentación y visita con acabados personalizados</p>
      </div>
      <div class="sc">
        <h3>Packaging</h3>
        <p>Empaques y cajas personalizadas para tus productos</p>
      </div>
    </div>
  </section>
</main>

<script src="/js/common.js"></script>
<script src="/js/imprenta2.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>
<!-- ftr -->
<footer class="ft">
  <div class="ftc">
    <p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
    <p>Servicios de imprenta de calidad para tus proyectos.</p>
  </div>
</footer>
</body>
</html>



