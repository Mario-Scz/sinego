// ============================================
// agregar libro - frma crear libro nuevo
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarfrmCatalogo();
});

function inicializarfrmCatalogo() {
    const frm = document.querySelector('.frm');
    
    if (frm) {
        // Validar en tiempo real
        const inputs = frm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validarcmpCatalogo);
        });
        
        // Submit del frm
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevoLibro();
        });
        
        debug('frm de agregar libro al catálogo inicializado');
    }
}

function validarcmpCatalogo(e) {
    const cmp = e.target;
    const valor = cmp.value.trim();
    
    if (cmp.id === 'prec') {
        const prec = parseFloat(valor);
        if (isNaN(prec) || prec <= 0) {
            cmp.style.borderColor = '#f44336';
            return false;
        } else {
            cmp.style.borderColor = '#4CAF50';
            return true;
        }
    }
    
    if (!valor) {
        cmp.style.borderColor = '#f44336';
        return false;
    } else {
        cmp.style.borderColor = '#4CAF50';
        return true;
    }
}

function guardarNuevoLibro() {
    const inputs = document.querySelectorAll('.frm input');
    const datos = {};
    let valido = true;
    
    inputs.forEach(input => {
        const valor = input.value.trim();
        if (!valor) {
            mostrarNotificacion(`El cmp "${input.placeholder}" no puede estar vacío`, 'error');
            input.focus();
            valido = false;
            return;
        }
        
        if (input.id === 'prec') {
            const prec = parseFloat(valor);
            if (isNaN(prec) || prec <= 0) {
                mostrarNotificacion('El prec debe ser un número mayor a 0', 'error');
                input.focus();
                valido = false;
                return;
            }
        }
        
        datos[input.id] = valor;
    });
    
    if (!valido) return;
    
    debug('Nuevo libro guardado:', datos);
    
    // Guardar en localStorage (simulación)
    let libros = Storage.get('libros') || [];
    libros.push({
        id: Date.now(),
        ...datos,
        fechaCreacion: new Date().toISOString()
    });
    Storage.set('libros', libros);
    
    mostrarNotificacion(`✓ Libro "${datos.tit}" agregado correctamente`, 'success');
    
    setTimeout(() => {
        window.location.href = 'catalog.html';
    }, 1500);
}


