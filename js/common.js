// ============================================
// FUNCIONES COMPARTIDAS PARA TODAS LAS PÁGINAS
// ============================================

// Cerrar menú cuando se hace click en un enlace
document.addEventListener('DOMContentLoaded', function() {
    const menuCheckbox = document.getElementById('mchk');
    const navMenu = document.querySelector('.menu-nav');
    
    if (menuCheckbox && navMenu) {
        // Cerrar menú cuando se hace click en un enlace
        const links = navMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuCheckbox.checked = false;
            });
        });
        
        // Cerrar menú cuando se hace click fuera
        document.addEventListener('click', function(event) {
            const nav = document.querySelector('.nav-cont');
            if (nav && !nav.contains(event.target)) {
                menuCheckbox.checked = false;
            }
        });
    }
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Notificación genérica
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `notification notification-${tipo}`;
    notificationDiv.textContent = mensaje;
    notificationDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease-in;
        font-weight: 500;
    `;
    
    document.body.appendChild(notificationDiv);
    
    setTimeout(() => {
        notificationDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notificationDiv.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transfrm: translateX(400px);
            opacity: 0;
        }
        to {
            transfrm: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transfrm: translateX(0);
            opacity: 1;
        }
        to {
            transfrm: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar teléfono
function validarTelefono(telefono) {
    const re = /^[0-9\s+\-()]{7,}$/;
    return re.test(telefono);
}

// Obtener parámetro URL
function obtenerParametroURL(parametro) {
    const url = new URLSearchParams(window.location.search);
    return url.get(parametro);
}

// Almacenamiento local (localStorage wrapper)
const Storage = {
    set: (clave, valor) => {
        localStorage.setItem(clave, JSON.stringify(valor));
    },
    get: (clave) => {
        const item = localStorage.getItem(clave);
        return item ? JSON.parse(item) : null;
    },
    remove: (clave) => {
        localStorage.removeItem(clave);
    },
    clear: () => {
        localStorage.clear();
    }
};

// Debug mode
const DEBUG = true;

function debug(mensaje, datos = null) {
    if (DEBUG) {
        console.log(`[SINEGO] ${mensaje}`, datos || '');
    }
}


