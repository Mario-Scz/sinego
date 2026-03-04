// ============================================
// FUNCIONALIDAD DEL MENÚ PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarMenuPrincipal();
});

function inicializarMenuPrincipal() {
    // Agregar efectos a las tarjetas de acciones
    configurarTarjetasAcciones();
    
    debug('Menú principal inicializado');
}

// Configurar efectos en tarjetas de acciones
function configurarTarjetasAcciones() {
    const accionCards = document.querySelectorAll('.acc-crd');
    
    accionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transfrm = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transfrm = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}


