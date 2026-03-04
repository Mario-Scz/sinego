// ============================================
// carrito - gestionar productos compra
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    actualizarContadores();
});

function inicializarCarrito() {
    const emptyCart = document.getElementById('emptyCart');
    const itemsList = document.getElementById('cartItems');

    // obtener lista de carrito desde el servidor
    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
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
            debug('Carrito inicializado:', carrito);
        });
}

function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-image">📦</div>
            <div class="item-details">
                <h3>${item.nombre}</h3>
                <p>prec: $${parseFloat(item.prec).toFixed(2)}</p>
            </div>
            <div class="item-price">
                $${(parseFloat(item.prec) * item.cantidad).toFixed(2)}
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="cambiarCantidad(${index}, -1)">−</button>
                <input type="number" class="quantity-input" value="${item.cantidad}" min="1" onchange="cambiarCantidadDirecta(${index}, this.value)">
                <button class="quantity-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                <button class="item-remove" onclick="eliminarDelCarrito(${index})">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

function cambiarCantidad(index, cantidad) {
    // ya no tenemos índice; hacemos update por producto
    // lista actual se puede recuperar vía API nuevamente
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'list' })
    })
    .then(r => r.json())
    .then(data => {
        if (!data.success) return;
        const carrito = data.items;
        const item = carrito[index];
        if (!item) return;
        const nuevaCantidad = item.cantidad + cantidad;
        fetch('/api/cart.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'update', product_id: item.id, cantidad: nuevaCantidad })
        }).then(() => inicializarCarrito());
    });
}

function cambiarCantidadDirecta(index, cantidad) {
    const cant = parseInt(cantidad);
    if (cant < 1) return;
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ action: 'list' })
    })
    .then(r => r.json())
    .then(data => {
        if (!data.success) return;
        const carrito = data.items;
        const item = carrito[index];
        if (!item) return;
        fetch('/api/cart.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'update', product_id: item.id, cantidad: cant })
        }).then(() => inicializarCarrito());
    });
}

function eliminarDelCarrito(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este item?')) {
        fetch('/api/cart.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'list' })
        })
        .then(r => r.json())
        .then(data => {
            if (!data.success) return;
            const item = data.items[index];
            if (!item) return;
            fetch('/api/cart.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ action: 'remove', product_id: item.id })
            }).then(() => {
                mostrarNotificacion(`${item.nombre} removido del carrito`, 'success');
                inicializarCarrito();
            });
        });
    }
}

function actualizarResumen(carrito) {
    let subtot = 0;
    carrito.forEach(item => {
        subtot += parseFloat(item.prec) * item.cantidad;
    });
    
    const tax = subtot * 0.10;
    const tot = subtot + tax;
    
    document.getElementById('subtot').textContent = `$${subtot.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('tot').textContent = `$${tot.toFixed(2)}`;
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar todo el carrito?')) {
        Storage.remove('carrito');
        mostrarNotificacion('Carrito vaciado', 'success');
        inicializarCarrito();
    }
}

function procederAlPago() {
    const carrito = Storage.get('carrito') || [];
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }
    
    debug('Procesando pago...', carrito);
    mostrarNotificacion('Procesando pago. Gracias por tu compra', 'success');
    
    setTimeout(() => {
        fetch('/api/cart.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'clear' })
        }).then(()=>{
            window.location.href = '/vistas/bienvenido.php';
        });
    }, 2000);
}

document.getElementById('checkoutBtn')?.addEventListener('click', procederAlPago);

function actualizarContadores() {
    // traer ambos conteos desde servidor
    Promise.all([
        fetch('/api/cart.php?action=list').then(r=>r.json()),
        fetch('/api/favorites.php?action=list').then(r=>r.json())
    ]).then(([cartRes, favRes]) => {
        const ccount = cartRes.success ? cartRes.items.length : 0;
        const fcount = favRes.success ? favRes.items.length : 0;
        document.querySelectorAll('#cCnt').forEach(el => { el.textContent = ccount; });
        document.querySelectorAll('#fCnt').forEach(el => { el.textContent = fcount; });
    }).catch(err=>debug('error contadores', err));
}

// Actualizar contadores cada vez que se agregue algo
setInterval(actualizarContadores, 500);


