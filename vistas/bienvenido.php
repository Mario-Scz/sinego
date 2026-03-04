<?php
$pageTitle='Bienvenido';
session_start();
// esta puede ser pública o para usuarios
?>
<?php include __DIR__ . '/../includes/header.php'; ?>
<link rel="stylesheet" href="../css/bienvenidocss.css">

<section class="welcome-section">
  <h1>Bienvenido a Sinego</h1>
  <p>Explora nuestro catálogo y disfruta de nuestros servicios.</p>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
</body>
</html>
