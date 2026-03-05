<?php
$pageTitle = 'Carrito';
session_start();
if (empty($_SESSION['usuario'])) {
    header('Location: /vistas/register.php');
    exit;
}
?>
<?php include __DIR__ . '/../includes/header.php'; ?>
<link rel="stylesheet" href="/css/cart.css">

<main class="cart-container">
  <h1>Tu carrito</h1>
  <div id="emptyCart" style="display:none;">No hay productos en el carrito.</div>
  <div id="cartItems"></div>
  <div class="cart-summary">
    <p>Subtotal: <span id="subtot">$0.00</span></p>
    <p>IVA: <span id="tax">$0.00</span></p>
    <p>Total: <span id="tot">$0.00</span></p>
  </div>
  <button id="checkoutBtn" class="btn">Proceder al pago</button>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="/js/cart.js"></script>
</body>
</html>
