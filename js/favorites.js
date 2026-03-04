// ============================================
// FAVORITOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarFavoritos();
    actualizarContadores();
});

function inicializarFavoritos() {
    const emptyFav = document.getElementById('emptyFavorites');
    const favGrid = document.getElementById('favoritesGrid');
    fetch('/api/favorites.php?action=list')
        .then(r=>r.json())
        .then(data=>{
            const favoritos = data.success ? data.items : [];
            if (favoritos.length === 0) {
                emptyFav.style.display = 'block';
                favGrid.style.display = 'none';
            } else {
                emptyFav.style.display = 'none';
                favGrid.style.display = 'grid';
                mostrarFavoritos(favoritos);
            }
            debug('Favoritos inicializados:', favoritos);
        });
}

function mostrarFavoritos(favoritos) {
    const favGrid = document.getElementById('favoritesGrid');
    favGrid.innerHTML = '';
    
    favoritos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.innerHTML = `
            <div class="card-image">
                📚
                <button class="card-remove-fav" onclick="eliminarDeFavoritos(${index})">✕</button>
            </div>
            <div class="card-content">
                <h3>${item.nombre}</h3>
                <p>Descripción del producto</p>
                <div class="card-price">$${parseFloat(item.prec).toFixed(2)}</div>
                <div class="card-actions">
                    <button class="card-btn btn-add-cart" onclick="agregarFavAlCarrito(${index})">Agregar</button>
                    <button class="card-btn" style="background-color: #ecf0f1; color: #2c3e50;" onclick="verDetalles('${item.nombre}')">Ver</button>
                </div>
            </div>
        `;
        favGrid.appendChild(card);
    });
}

function eliminarDeFavoritos(index) {
    // obtener lista para conocer el id
    fetch('/api/favorites.php?action=list')
        .then(r=>r.json())
        .then(data=>{
            if (!data.success) return;
            const item = data.items[index];
            if (!item) return;
            fetch('/api/favorites.php', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ action:'remove', product_id:item.id })
            }).then(()=>{
                mostrarNotificacion(`${item.nombre} removido de favoritos`, 'success');
                inicializarFavoritos();
                actualizarContadores();
            });
        });
}

function agregarFavAlCarrito(index) {
    fetch('/api/favorites.php?action=list')
        .then(r=>r.json())
        .then(data=>{
            if (!data.success) return;
            const item = data.items[index];
            if (!item) return;
            fetch('/api/cart.php', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ action:'add', product_id:item.id })
            }).then(r=>r.json()).then(cd=>{
                if (cd.success) {
                    mostrarNotificacion(`${item.nombre} agregado al carrito`, 'success');
                    actualizarContadores();
                }
            });
        });
}

function verDetalles(nombre) {
    debug('Ver detalles:', nombre);
    mostrarNotificacion(`Detalles de ${nombre}`, 'info');
}

function agregarAFavoritos(id) {
    // recibe el id de producto
    fetch('/api/favorites.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ action:'add', product_id:id })
    }).then(r=>r.json()).then(data=>{
        if (data.success) {
            mostrarNotificacion('Producto agregado a favoritos', 'success');
            actualizarContadores();
        } else {
            mostrarNotificacion(data.message || 'No se pudo añadir', 'error');
        }
    });
}

function actualizarContadores() {
    const carrito = Storage.get('carrito') || [];
    const favoritos = Storage.get('favoritos') || [];
    
    const ccntElements = document.querySelectorAll('#cCnt');
    const fcntElements = document.querySelectorAll('#fCnt');
    
    ccntElements.forEach(el => {
        el.textContent = carrito.length;
    });
    
    fcntElements.forEach(el => {
        el.textContent = favoritos.length;
    });
}

// Actualizar contadores cada vez que se agregue algo
setInterval(actualizarContadores, 500);


