
<?php include __DIR__ . '/../includes/header.php'; ?>
<link rel="stylesheet" href="/css/catalogo.css">

<section class="h">
  <div class="hc">
    <h1 class="ht">Nuestro Catálogo</h1>
    <p class="hs">Explora nuestra colección de productos y servicios</p>
  </div>
</section>

<main class="c">
  <div class="cl2">

    <aside class="fs2">
      <h3>Filtros</h3>
      <div class="fg2">
        <h4>Géneros</h4>
        <!-- inputs serán usados por JS para filtrar -->
        <label class="flt">
          <input type="checkbox" checked>
          <span>Comedia</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Drama</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Terror</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Romance</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Filosofía</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Infantil</span>
        </label>
        <label class="flt">
          <input type="checkbox" checked>
          <span>Fantasía</span>
        </label>
      </div>
    </aside>


    <section class="ps">
      <div class="bb">
        <input type="text" placeholder="Buscar productos..." class="ib inp-bus">
      </div>
      
      <div class="pg" id="productosGrid">
        <!-- tarjetas cargadas por JS -->
      </div>
    </section>
  </div>
</main>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="/js/catalogo.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>
</body>
</html>
