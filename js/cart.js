document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    actualizarContadores();
});

function inicializarCarrito() {
    const emptyCart = document.getElementById('emptyCart');
    const itemsList = document.getElementById('cartItems');

    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (data.success && data.items.length > 0) {
                emptyCart.style.display = 'none';
                itemsList.style.display = 'block';
                mostrarItemsCarrito(data.items);
                actualizarResumen(data.items);
            } else {
                emptyCart.style.display = 'block';
                itemsList.style.display = 'none';
                actualizarResumen([]);
            }
        });
}

function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        // Aquí guardamos el ID real de la tabla 'carrito'
        itemElement.dataset.id = item.id; 
        itemElement.dataset.cantidad = item.cantidad;
        itemElement.dataset.precio = item.precio;

        itemElement.innerHTML = `
            <div class="item-details">
                <h3>${item.titulo}</h3>
                <p>Precio: $${parseFloat(item.precio).toFixed(2)}</p>
            </div>
            <div class="item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
            <div class="item-quantity">
                <button class="btn-minus">−</button>
                <input type="number" value="${item.cantidad}" readonly />
                <button class="btn-plus">+</button>
                <button class="btn-remove">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

// MANEJO DE CLICS EN BOTONES (Eliminar y Unidades)
document.getElementById('cartItems').addEventListener('click', function(e) {
    const btn = e.target;
    const itemRow = btn.closest('.cart-item');
    if (!itemRow) return;

    const id_carrito = itemRow.dataset.id;
    const cantidad = parseInt(itemRow.dataset.cantidad);

    if (btn.classList.contains('btn-remove')) {
        ejecutarAccion('remove', { product_id: id_carrito });
    } else if (btn.classList.contains('btn-minus') && cantidad > 1) {
        ejecutarAccion('update', { product_id: id_carrito, cantidad: cantidad - 1 });
    } else if (btn.classList.contains('btn-plus')) {
        ejecutarAccion('update', { product_id: id_carrito, cantidad: cantidad + 1 });
    }
});

function ejecutarAccion(accion, datos) {
    fetch(`/api/cart.php?action=${accion}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            inicializarCarrito();
            actualizarContadores();
        }
    });
}

function actualizarResumen(carrito) {
    let sub = 0;
    carrito.forEach(i => sub += (i.precio * i.cantidad));
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