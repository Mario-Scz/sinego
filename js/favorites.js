document.addEventListener('DOMContentLoaded', function() {
    inicializarFavoritos();
    actualizarContadoresFavs();
});

// 1. CARGA INICIAL
function inicializarFavoritos() {
    const emptyFav = document.getElementById('emptyFav'); // Coincide con tu HTML
    const favGrid = document.getElementById('favGrid');   // Coincide con tu HTML

    if (!favGrid) return; // Por si estamos en otra página

    fetch('/api/favorites.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (data.success && data.items.length > 0) {
                if(emptyFav) emptyFav.style.display = 'none';
                favGrid.style.display = 'grid';
                mostrarFavoritos(data.items);
            } else {
                if(emptyFav) emptyFav.style.display = 'block';
                favGrid.style.display = 'none';
            }
        })
        .catch(err => console.error('Error al cargar favoritos:', err));
}

// 2. RENDERIZADO DE TARJETAS
function mostrarFavoritos(favoritos) {
    const favGrid = document.getElementById('favGrid');
    favGrid.innerHTML = '';
    
    favoritos.forEach(item => {
        const card = document.createElement('div');
        card.className = 'fav-card'; // Clase para tu CSS
        // Guardamos el ID de la tabla favoritos y el ID del libro
        card.dataset.id_fav = item.id; 
        card.dataset.id_libro = item.id_libro;

        card.innerHTML = `
            <div class="fav-image">
                <img src="/img/ejemplos.png" alt="${item.titulo}">
                <button class="btn-remove-fav">✕</button>
            </div>
            <div class="fav-details">
                <h3>${item.titulo}</h3>
                <p><strong>Autor:</strong> ${item.autor}</p>
                <div class="price">$${parseFloat(item.precio).toFixed(2)}</div>
                <div class="fav-actions">
                    <button class="b bp btn-move-cart">Mover al Carrito</button>
                </div>
            </div>
        `;
        favGrid.appendChild(card);
    });
}

// 3. EVENTOS (ELIMINAR Y MOVER)
if (document.getElementById('favGrid')) {
    document.getElementById('favGrid').addEventListener('click', function(e) {
        const card = e.target.closest('.fav-card');
        if (!card) return;

        const idFav = card.dataset.id_fav;
        const idLibro = card.dataset.id_libro;
        const titulo = card.querySelector('h3').textContent;

        // BOTÓN ELIMINAR
        if (e.target.classList.contains('btn-remove-fav')) {
            eliminarFavorito(idFav, titulo);
        }

        // BOTÓN MOVER AL CARRITO
        if (e.target.classList.contains('btn-move-cart')) {
            moverAlCarrito(idLibro, idFav, titulo);
        }
    });
}

// 4. ACCIÓN: AGREGAR (Desde el clic en la imagen del catálogo)
function agregarAFavoritos(idLibro, titulo) {
    fetch('/api/favorites.php?action=add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: idLibro })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            alert(`${titulo} añadido a favoritos ❤️`);
            actualizarContadorFavs();
        } else {
            alert('Este producto ya está en tus favoritos');
        }
    });
}

// 5. ACCIÓN: ELIMINAR
function eliminarFavorito(id, titulo) {
    fetch('/api/favorites.php?action=remove', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: id })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            inicializarFavoritos();
            actualizarContadorFavs();
        }
    });
}

// 6. ACCIÓN: MOVER AL CARRITO
function moverAlCarrito(idLibro, idFav, titulo) {
    fetch('/api/cart.php?action=add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: idLibro })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            // Si se agregó al carrito, lo borramos de favoritos automáticamente
            eliminarFavorito(idFav, titulo);
            alert(`${titulo} movido al carrito`);
            // Actualizar contador de carrito (id "cc")
            const cc = document.getElementById('cc');
            if(cc) actualizarContadorCarrito(); 
        }
    });
}

// 7. ACTUALIZAR CONTADOR DEL NAV (ID "cf")
function actualizarContadorFavs() {
    fetch('/api/favorites.php?action=count')
        .then(r => r.json())
        .then(data => {
            const el = document.getElementById('cf');
            if (el) el.textContent = data.total || 0;
        });
}

// Función auxiliar para el contador de carrito
function actualizarContadorCarrito() {
    fetch('/api/cart.php?action=count')
        .then(r => r.json())
        .then(data => {
            const el = document.getElementById('cc');
            if (el) el.textContent = data.total || 0;
        });
}