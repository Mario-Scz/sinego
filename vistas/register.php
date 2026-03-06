<?php
$pageTitle = 'Iniciar Sesión';
session_start();
require __DIR__ . '/../config/db.php';

// Si ya hay sesión activa, redirigir al menú
if (!empty($_SESSION['usuario'])) {
    header('Location: /vistas/menu.php');
    exit;
}

$error = '';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Iniciar Sesión - Sinego</title>
<link rel="stylesheet" href="/css/register.css">
</head>
<body>

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
        <img src="/img/sinego.png" alt="Sinego" />
      </div>
      <h2>Bienvenido</h2>
      <p class="login-subtitle">Ingresa tus credenciales</p>
      
      <form class="login-frm" id="loginForm">
        <div class="fm-grp">
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" name="usuario" placeholder="Usuario" required>
        </div>

        <div class="fm-grp">
          <label for="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Contraseña" required>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesión</button>

        <p id="errorMsg" style="color:red; margin-top:10px;"></p>
      </form>

      <p class="login-note">
        <strong>Nota:</strong> Las cuentas son creadas por administrador.
      </p>
    </div>
  </div>
</main>

<script src="/js/register.js"></script>

</body>
</html>