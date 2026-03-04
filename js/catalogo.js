// ============================================
// FUNCIONALIDAD DEL CATÁLOGO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarCatalogo();
});

function inicializarCatalogo() {
    // Búsqueda de productos
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', buscarProductos);
    }

    // flts de géneros
    const flts = document.querySelectorAll('.flt input[type="checkbox"]');
    flts.forEach(flt => {
        flt.addEventListener('change', aplicarflts);
    });

    // cargar productos desde el servidor
    fetch('/api/productos.php')
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                renderizarProductos(data.productos);
            } else {
                mostrarNotificacion('No se pudieron cargar los productos', 'error');
            }
        })
        .catch(err => debug('error fetch productos', err));

    debug('Catálogo inicializado');
}

// guarda el listado obtenido del servidor para filtrar localmente
let productosLista = [];

// Buscar productos
function buscarProductos(e) {
    const termBus = e.target.value.toLowerCase();
    const filtrados = productosLista.filter(p =>
        p.nombre.toLowerCase().includes(termBus) ||
        (p.descripcion || '').toLowerCase().includes(termBus)
    );
    renderizarProductos(filtrados);
    debug(`Búsqueda de productos: ${termBus} - ${filtrados.length} resultados`);
}

// Aplicar flts de géneros
function aplicarflts() {
    const fltsActivos = document.querySelectorAll('.flt input[type="checkbox"]:checked');
    const generosSeleccionados = Array.from(fltsActivos).map(f => 
        f.nextElementSibling.textContent.toLowerCase()
    );
    
    const filtrados = productosLista.filter(p => {
        if (generosSeleccionados.length === 0) return true;
        return generosSeleccionados.includes((p.genero || '').toLowerCase());
    });
    renderizarProductos(filtrados);
    debug('flts aplicados:', generosSeleccionados, filtrados.length);
}

// Configurar botones de agregar al carrito (convertidos en acción POST al backend)
function configurarBotonesCarrito() {
    const botonesAgregar = document.querySelectorAll('.bagr');
    
    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.prod-crd');
            const id = card.dataset.id;
            fetch('/api/cart.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ action: 'add', product_id: id })
            }).then(r => r.json())
              .then(data => {
                  if (data.success) {
                      mostrarNotificacion('✓ Producto agregado al carrito','success');
                      actualizarContadores();
                  } else {
                      mostrarNotificacion(data.message || 'No se pudo agregar al carrito','error');
                  }
              }).catch(err => {
                  debug('error add cart', err);
              });
        });
    });
}

// Ver carrito sólo notifica vía servidor
function verCarrito() {
    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                const count = data.items.length;
                if (count === 0) {
                    mostrarNotificacion('El carrito está vacío', 'info');
                } else {
                    mostrarNotificacion(`Carrito: ${count} producto(s)`, 'info');
                }
            }
        });
}

// Vaciar carrito
function vaciarCarrito() {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'clear' })
    }).then(r => r.json())
      .then(data => {
          if (data.success) {
              mostrarNotificacion('Carrito vaciado', 'success');
              actualizarContadores();
          }
      });
}

// renderiza un array de productos en el contenedor
function renderizarProductos(arr) {
    productosLista = arr.slice(); // clonar para filtros posteriores
    const grid = document.querySelector('.pg') || document.getElementById('productosGrid');
    if (!grid) return;
    grid.innerHTML = '';
    arr.forEach(p => {
        const card = document.createElement('div');
        card.className = 'prod-crd';
        card.dataset.id = p.id;
        card.innerHTML = `
            <div class="pc">
                <div class="pi"><img src="${p.imagen || '../img/ejemplos.png'}" alt="${p.nombre}"></div>
                <div class="pf">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion || ''}</p>
                    <span class="pr">$${parseFloat(p.precio).toFixed(2)}</span>
                    <div class="card-actions">
                        <button class="btn-agr bagr">Agregar al carrito</button>
                        <button class="btn-fav" onclick="agregarAFavoritos(${p.id})">❤</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    configurarBotonesCarrito();
}


