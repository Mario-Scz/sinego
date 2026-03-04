<?php
$pageTitle = 'Iniciar Sesión';
// si ya hay sesión iniciada puedes redirigir a otro lado
session_start();
if (!empty($_SESSION['usuario'])) {
    header('Location: /vistas/menu.php');
    exit;
}
?>
<?php include __DIR__ . '/../includes/header.php'; ?>

<section class="d">
  <div class="hc">
    <h1 class="ht">Iniciar Sesión</h1>
    <p class="hs">Accede a tu cuenta de Sinego</p>
  </div>
</section>

<main class="login-wrapper">
  <div class="login-cont">
    <div class="login-card">
      <div class="login-logo">
        <img src="../img/sinego.png" alt="Sinego" />
      </div>
      <h2>Bienvenido</h2>
      <p class="login-subtitle">Ingresa tus credenciales para acceder</p>
      
      <form class="login-frm" method="post" action="#">
        <div class="fm-grp">
          <label for="usuario">Usuario</label>
          <input type="text" id="usr" name="usuario" placeholder="Ingresa tu usuario" required>
        </div>

        <div class="fm-grp">
          <label for="password">Contraseña</label>
          <input type="password" id="pwd" name="password" placeholder="Ingresa tu contraseña" required>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesión</button>
      </form>

      <p class="login-note">
        <strong>Nota:</strong> Las cuentas son creadas por administrador. Si aún no tienes acceso, contacta al equipo de soporte.
      </p>
    </div>
  </div>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>