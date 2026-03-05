<?php
$pageTitle = 'Administración';
session_start();
if (empty($_SESSION['usuario'])) {
    header('Location: /vistas/register.php');
    exit;
}
?>
<?php include __DIR__ . '/../includes/header.php'; ?>
<link rel="stylesheet" href="/css/administrar.css">

<section class="d2">
  <div class="cd">
    <h1 class="td2">Administración</h1>
    <p class="sd">Gestiona los datos de tu plataforma</p>
  </div>
</section>

<main class="c">
  <section class="ts">
    <div class="te">
      <h2>Productos</h2>
      <button id="addProductBtn" class="b bp">+ Añadir Producto</button>
    </div>
    
    <div class="bb">
      <input type="text" placeholder="Buscar producto..." class="ib inp-bus" />
    </div>

    <div class="tw">
      <table class="td" id="adminProducts">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="adminProductsBody">
          <!-- filas generadas por JS -->
        </tbody>
      </table>
    </div>

    <form id="createProductForm" style="display:none; margin-top:16px;">
      <h3>Crear Producto</h3>
      <label>Nombre<br><input name="nombre" required></label><br>
      <label>Descripción<br><textarea name="descripcion"></textarea></label><br>
      <label>Precio<br><input name="precio" type="number" step="0.01" value="0"></label><br>
      <label>Género<br><input name="genero"></label><br>
      <button type="submit">Crear</button>
      <button type="button" onclick="document.getElementById('createProductForm').style.display='none'">Cancelar</button>
    </form>

  </section>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="/js/adm-products.js"></script>
</body>
</html>
