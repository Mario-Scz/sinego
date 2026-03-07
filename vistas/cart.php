<?php
$pageTitle = 'Carrito de Compras';
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito de Compras - Sinego</title>
    <link rel="stylesheet" href="../css/cart.css">
</head>
<body>

<!-- NAV -->
<nav class="n">
  <div class="nc">
    <div class="nl">
      <a href="/vistas/bienvenido.php">
        <img src="../img/sinego.png" alt="Sinego Logo" class="lg" />
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
        <li><a href="/vistas/catalogo.php">CATÁLOGO</a></li>
        <li><a href="/vistas/register.php">INICIAR SESIÓN</a></li>
        <li><a href="/vistas/menu.php">MENÚ</a></li>
      </ul>
    </nav>
    <div class="ni">
      <a href="/vistas/cart.php" class="ic active" id="cartico" title="Carrito">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cc" id="cc">0</span>
      </a>
    </div>
  </div>
</nav>

<!-- SECCIÓN DESTACADA -->
<section class="d">
  <div class="hc">
    <h1 class="ht">Carrito de Compras</h1>
    <p class="hs">Revisa y confirma tus compras</p>
  </div>
</section>

<!-- CONTENIDO PRINCIPAL (CARRITO) -->
<main class="c">
  <section class="ct-sec">
    <div class="ct-cont">
      <!-- Items del carrito -->
      <div class="ct-items">
        <div class="emp-ct" id="emptyCart">
          <p>Tu carrito está vacío</p>
          <a href="/vistas/catalogo.php" class="b bp">Continuar Comprando</a>
        </div>
        <div class="items-lst" id="cartItems" style="display: none;"></div>
      </div>

      <!-- Resumen de compra -->
      <aside class="ct-sum">
        <h2>Resumen de Compra</h2>
        <div class="sum-rows" id="summarySummary">
          <div class="sum-row">
            <span>Subtotal</span>
            <span id="subtotal">$0.00</span>
          </div>
          <div class="sum-row">
            <span>Impuesto (10%)</span>
            <span id="tax">$0.00</span>
          </div>
          <div class="sum-div"></div>
          <div class="sum-row tot">
            <span>Total</span>
            <span id="total">$0.00</span>
          </div>
        </div>
        <button class="b bp" id="chkBtn">Proceder al Pago</button>
        <a href="/vistas/catalogo.php" class="b bs">Seguir Comprando</a>
      </aside>
    </div>
  </section>
</main>

<!-- FOOTER -->
<footer class="ft">
  <div class="ftc">
    <p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
  </div>
</footer>

<script src="/js/common.js"></script>
<script src="/js/cart.js"></script>

</body>
</html>