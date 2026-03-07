document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrito();
    actualizarContadores();
});

function inicializarCarrito() {
    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            const emptyCart = document.getElementById('emptyCart');
            const itemsList = document.getElementById('cartItems');
            
            if (data.success && data.items.length > 0) {
                emptyCart.style.display = 'none';
                itemsList.style.display = 'block';
                renderizarItems(data.items);
                actualizarResumen(data.items);
            } else {
                emptyCart.style.display = 'block';
                itemsList.style.display = 'none';
                actualizarResumen([]);
            }
        });
}

function renderizarItems(items) {
    const container = document.getElementById('cartItems');
    container.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}" data-precio="${item.precio}" data-cant="${item.cantidad}">
            <div class="item-details">
                <h3>${item.titulo || 'Libro'}</h3>
                <p>Precio: $${parseFloat(item.precio).toFixed(2)}</p>
            </div>
            <div class="item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
            <div class="item-quantity">
                <button class="btn-minus">−</button>
                <input type="number" value="${item.cantidad}" readonly />
                <button class="btn-plus">+</button>
                <button class="btn-remove">✕</button>
            </div>
        </div>
    `).join('');
}

// Delegación de eventos para botones
document.getElementById('cartItems').addEventListener('click', (e) => {
    const row = e.target.closest('.cart-item');
    if (!row) return;

    const id = row.dataset.id; // Este es el ID de la base de datos
    const cant = parseInt(row.dataset.cant);

    if (e.target.classList.contains('btn-plus')) {
        peticionUpdate(id, cant + 1);
    } else if (e.target.classList.contains('btn-minus') && cant > 1) {
        peticionUpdate(id, cant - 1);
    } else if (e.target.classList.contains('btn-remove')) {
        if (confirm('¿Eliminar producto?')) peticionRemove(id);
    }
});

function peticionUpdate(id, nuevaCant) {
    fetch('/api/cart.php', {
        method: 'POST',
        body: JSON.stringify({ action: 'update', product_id: id, cantidad: nuevaCant })
    })
    .then(r => r.json())
    .then(data => data.success && inicializarCarrito());
}

function peticionRemove(id) {
    fetch('/api/cart.php', {
        method: 'POST',
        body: JSON.stringify({ action: 'remove', product_id: id })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            inicializarCarrito();
            actualizarContadores();
        }
    });
}

function actualizarResumen(items) {
    let sub = items.reduce((a, b) => a + (b.precio * b.cantidad), 0);
    document.getElementById('subtotal').textContent = `$${sub.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${(sub * 0.1).toFixed(2)}`;
    document.getElementById('total').textContent = `$${(sub * 1.1).toFixed(2)}`;
}

function actualizarContadores() {
    fetch('/api/cart.php?action=count')
        .then(r => r.json())
        .then(data => {
            document.querySelectorAll('#cc').forEach(el => el.textContent = data.total || 0);
        });
}