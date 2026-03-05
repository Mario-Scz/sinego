<?php
$pageTitle = 'Favoritos';
session_start();
if (empty($_SESSION['usuario'])) {
    header('Location: /vistas/register.php');
    exit;
}
?>
<?php include __DIR__ . '/../includes/header.php'; ?>
<link rel="stylesheet" href="/css/favorites.css">

<main class="favorites-container">
  <h1>Tus favoritos</h1>
  <div id="emptyFavorites" style="display:none;">No hay favoritos todavía.</div>
  <div id="favoritesGrid"></div>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="/js/favorites.js"></script>
</body>
</html>
