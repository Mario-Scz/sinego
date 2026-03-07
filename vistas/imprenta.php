<?php
// imprenta.php
?>
<section class="fs">
  <div class="fg">
    <div class="fi">
      <img src="/img/libro.png" alt="Imprenta" class="fi" />
    </div>
    <div class="fc">
      <h2>Cotiza tu Proyecto</h2>

      <!-- Mensaje dinámico -->
      <?php
      if(isset($_GET['success']) && $_GET['success'] == 1){
          echo '<p class="mensaje-exito">¡Formulario enviado correctamente!</p>';
      } elseif(isset($_GET['error']) && $_GET['error'] == 1){
          echo '<p class="mensaje-error">Error al enviar el formulario. Intenta de nuevo.</p>';
      }
      ?>

      <p>Completa los siguientes datos para obtener un presupuesto personalizado</p>
      <form class="fm" action="/vistas/enviar_form.php" method="POST">
        <div class="cp">
          <label>No. de unidades</label>
          <input type="number" name="unidades" placeholder="Ingrese la cantidad" required />
        </div>
        <div class="cp">
          <label>Cantidad de páginas</label>
          <input type="number" name="paginas" placeholder="Ingrese el número de páginas" required />
        </div>
        <div class="cp">
          <label>Tipo de impresión</label>
          <select name="tipo_impresion" required>
            <option value="">Seleccione un tipo</option>
            <option value="blanco-negro">Blanco y Negro</option>
            <option value="color">A Color</option>
            <option value="especial">Impresión Especial</option>
          </select>
        </div>
        <div class="cp">
          <label>Material</label>
          <select name="material" required>
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