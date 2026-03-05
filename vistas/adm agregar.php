<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agregar Usuario - Administración</title>
    <link rel="stylesheet" href="/css/adm agregar.css">
</head>
<body>
    <!--
    barra de navegación
    -->
    <nav class="n">
        <div class="nc">
            <a href="bienvenido.html" class="nl">
                <img src="/img/sinego.png" alt="Logo" class="lg">

            </a>
            <input type="checkbox" id="cm" class="cm">
            <label for="cm" class="tm">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <nav class="mn">
                <ul>
                    <li><a href="menu.php">Inicio</a></li>
                    <li><a href="administrar.php">Administración</a></li>
                    <li><a href="cliente.php">Clientes</a></li>
                    <li><a href="catalog.php">Catálogo</a></li>
                </ul>
            </nav>            <div class="ni">
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
            </div>        </div>
    </nav>

    <!--
    sección dstacada
    -->
    <section class="d2">
        <div class="cd">
            <h1 class="td2">Agregar Usuario</h1>
            <p class="sd">Administración - Nuevo Usuario</p>
        </div>
    </section>

    <!--
    formulario de usuario nuevo
    -->
    <main class="c">
        <section class="fs">
            <div class="fc">
                <form class="fm">
                    <div class="fl">
                        <label for="nombre">Nombre Completo</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Ingrese nombre completo" required>
                    </div>
                    <div class="fl">
                        <label for="telefono">Teléfono</label>
                        <input type="text" id="telefono" name="telefono" placeholder="Ingrese teléfono" required>
                    </div>
                    <div class="fl">
                        <label for="correo">Correo Electrónico</label>
                        <input type="email" id="correo" name="correo" placeholder="Ingrese correo" required>
                    </div>
                    <div class="bf">
                        <a href="administrar.html"><button type="button" class="b bs">Regresar</button></a>
                        <button type="submit" class="b bp">Confirmar</button>
                    </div>
                </form>
            </div>
        </section>
    </main>

    <!--
    pie de página
    -->
    <footer class="ft">
        <div class="ftc">
            <p>&copy; 2024 SineGo. Todos los derechos reservados.</p>
            <p>Plataforma de Gestión Empresarial</p>
        </div>
    </footer>
<script src="/js/common.js"></script>
<script src="/js/adm-add.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>
</body>
</html>


