document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    actualizarContadores();
});

function inicializarCarrito() {
    const emptyCart = document.getElementById('emptyCart');
    const itemsList = document.getElementById('cartItems');

    fetch('/api/cart.php?action=list')
        .then(r => {
            if (!r.ok) {
                throw new Error('Error en la respuesta: ' + r.status);
            }
            return r.text();
        })
        .then(text => {
            try {
                const data = JSON.parse(text);
                const carrito = data.success ? data.items : [];
                if (carrito.length === 0) {
                    emptyCart.style.display = 'block';
                    itemsList.style.display = 'none';
                } else {
                    emptyCart.style.display = 'none';
                    itemsList.style.display = 'block';
                    mostrarItemsCarrito(carrito);
                    actualizarResumen(carrito);
                }
            } catch (e) {
                console.error('Error al parsear JSON:', text);
            }
        })
        .catch(err => {
            console.error('Error de red:', err);
        });
}

function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id = item.id;
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
                <input type="number" class="quantity-input" value="${item.cantidad}" min="1">
                <button class="quantity-btn btn-plus">+</button>
                <button class="item-remove btn-remove">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

function actualizarCantidad(itemId, nuevaCantidad, titulo) {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'update', product_id: itemId, cantidad: nuevaCantidad })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            const itemRow = document.querySelector(`.cart-item[data-id="${itemId}"]`);
            if (itemRow) {
                itemRow.dataset.cantidad = nuevaCantidad;
                const precio = parseFloat(itemRow.dataset.precio);
                itemRow.querySelector('.item-price').textContent = `$${(precio * nuevaCantidad).toFixed(2)}`;
                actualizarResumen(JSON.parse(JSON.stringify(carritoActual)));
            }
        }
    })
    .catch(err => console.error('Error al actualizar:', err));
}

function eliminarItem(itemId, titulo) {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'remove', product_id: itemId })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            alert(`${titulo} removido del carrito`);
            inicializarCarrito();
        }
    })
    .catch(err => console.error('Error al eliminar:', err));
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
    const carrito = document.getElementById('cartItems');
    if (carrito.style.display === 'none') {
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

document.getElementById('chkBtn')?.addEventListener('click', procederAlPago);

function actualizarContadores() {
    fetch('/api/cart.php?action=count')
        .then(r => r.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                document.querySelectorAll('#cc').forEach(el => { el.textContent = data.total || 0; });
            } catch (e) {
                console.error('Error al parsear contador:', text);
            }
        })
        .catch(err => {
            console.error('Error contadores:', err);
        });
}

setInterval(actualizarContadores, 2000);

// EVENT DELEGATION - Manejo de botones
document.getElementById('cartItems').addEventListener('click', function(e) {
    const btn = e.target;
    const itemRow = btn.closest('.cart-item');
    
    if (!itemRow) return;
    
    const itemId = itemRow.dataset.id;
    const currentCantidad = parseInt(itemRow.dataset.cantidad);
    const titulo = itemRow.dataset.titulo;
    
    // Botón Eliminar (X)
    if (btn.classList.contains('btn-remove')) {
        if (confirm('¿Estás seguro de que deseas eliminar este item?')) {
            eliminarItem(itemId, titulo);
        }
        return;
    }
    
    // Botón Disminuir (-)
    if (btn.classList.contains('btn-minus')) {
        if (currentCantidad > 1) {
            actualizarCantidad(itemId, currentCantidad - 1, titulo);
        }
        return;
    }
    
    // Botón Aumentar (+)
    if (btn.classList.contains('btn-plus')) {
        actualizarCantidad(itemId, currentCantidad + 1, titulo);
        return;
    }
    
    // Input de cantidad
    if (btn.classList.contains('quantity-input')) {
        const nuevaCantidad = parseInt(btn.value);
        if (nuevaCantidad >= 1) {
            actualizarCantidad(itemId, nuevaCantidad, titulo);
        }
    }
});