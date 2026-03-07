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
            if (!data.success) throw new Error('Error al obtener carrito');
            const carrito = data.items;
            if (carrito.length === 0) {
                emptyCart.style.display = 'block';
                itemsList.style.display = 'none';
            } else {
                emptyCart.style.display = 'none';
                itemsList.style.display = 'block';
                mostrarItemsCarrito(carrito);
                actualizarResumen(carrito);
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id_libro = item.id_libro;
        itemElement.dataset.cantidad = item.cantidad;
        itemElement.dataset.titulo = item.titulo;
        itemElement.dataset.precio = item.precio;

        itemElement.innerHTML = `
            <div class="item-image">📚</div>
            <div class="item-details">
                <h3>${item.titulo || 'Sin título'}</h3>
                <p>Autor: ${item.autor || 'Sin autor'}</p>
                <p>Precio unitario: $${parseFloat(item.precio || 0).toFixed(2)}</p>
            </div>
            <div class="item-price">
                $${(parseFloat(item.precio || 0) * item.cantidad).toFixed(2)}
            </div>
            <div class="item-quantity">
                <button class="quantity-btn btn-minus">−</button>
                <input type="number" class="quantity-input" value="${item.cantidad}" min="1" />
                <button class="quantity-btn btn-plus">+</button>
                <button class="item-remove btn-remove">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

function actualizarCantidad(id_libro, nuevaCantidad, titulo) {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'update', product_id: id_libro, cantidad: nuevaCantidad })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const itemRow = document.querySelector(`.cart-item[data-id_libro="${id_libro}"]`);
            if (itemRow) {
                itemRow.dataset.cantidad = nuevaCantidad;
                const precio = parseFloat(itemRow.dataset.precio);
                itemRow.querySelector('.item-price').textContent = `$${(precio * nuevaCantidad).toFixed(2)}`;
                fetch('/api/cart.php?action=list')
                    .then(r => r.json())
                    .then(data => {
                        if (data.success) {
                            actualizarResumen(data.items);
                        }
                    });
            }
        }
    })
    .catch(err => console.error('Error:', err));
}

function eliminarItem(id_libro, titulo) {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'remove', product_id: id_libro })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            alert(`${titulo} removido del carrito`);
            inicializarCarrito();
            actualizarContadores();
        }
    })
    .catch(err => console.error('Error:', err));
}

function actualizarResumen(carrito) {
    let subtot = 0;
    carrito.forEach(item => {
        subtot += parseFloat(item.precio || 0) * item.cantidad;
    });
    const tax = subtot * 0.10;
    const tot = subtot + tax;

    document.getElementById('subtotal').textContent = `$${subtot.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${tot.toFixed(2)}`;
}

function procederAlPago() {
    const carritoDiv = document.getElementById('cartItems');
    if (carritoDiv.style.display === 'none') {
        alert('Tu carrito está vacío');
        return;
    }
    alert('Procesando pago. Gracias por tu compra');

    setTimeout(() => {
        fetch('/api/cart.php?action=clear')
            .then(() => {
                window.location.href = '/vistas/bienvenido.php';
            });
    }, 2000);
}

const chkBtn = document.getElementById('chkBtn');
if (chkBtn) {
    chkBtn.addEventListener('click', procederAlPago);
}

// Contadores en tiempo real
function actualizarContadores() {
    fetch('/api/cart.php?action=count')
        .then(r => r.json())
        .then(data => {
            document.querySelectorAll('#cc').forEach(el => { el.textContent = data.total || 0; });
        })
        .catch(err => console.error('Error contador:', err));
}
setInterval(actualizarContadores, 2000);

// Delegación de eventos
document.getElementById('cartItems').addEventListener('click', function(e) {
    const btn = e.target;
    const itemRow = btn.closest('.cart-item');
    if (!itemRow) return;

    const id_libro = itemRow.dataset.id_libro;
    const cantidad = parseInt(itemRow.dataset.cantidad);
    const titulo = itemRow.dataset.titulo;

    if (btn.classList.contains('btn-remove')) {
        if (confirm('¿Estás seguro de que deseas eliminar este item?')) {
            eliminarItem(id_libro, titulo);
        }
        return;
    }
    if (btn.classList.contains('btn-minus')) {
        if (cantidad > 1) {
            actualizarCantidad(id_libro, cantidad - 1, titulo);
        }
        return;
    }
    if (btn.classList.contains('btn-plus')) {
        actualizarCantidad(id_libro, cantidad + 1, titulo);
        return;
    }
    if (btn.classList.contains('quantity-input')) {
        const nuevaCantidad = parseInt(btn.value);
        if (nuevaCantidad >= 1) {
            actualizarCantidad(id_libro, nuevaCantidad, titulo);
        }
        return;
    }
});