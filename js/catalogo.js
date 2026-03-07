document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".pg");
  const buscarInput = document.querySelector(".ib");
  const checkboxes = document.querySelectorAll(".flt input[type='checkbox']");

  async function cargarLibros() {
    try {
      const res = await fetch("/api/catalogo/consultar.php");
      const data = await res.json();

      grid.innerHTML = "";

      if (data.length === 0) {
        grid.innerHTML = "<p style='text-align:center; padding:20px;'>No hay libros disponibles</p>";
        return;
      }

      data.forEach(libro => {
        const card = document.createElement("div");
        card.className = "pc";
        card.dataset.id = libro.id;
        card.dataset.titulo = libro.titulo.toLowerCase();
        card.dataset.autor = libro.autor.toLowerCase();
        card.dataset.tipo = libro.tipo.toLowerCase();

        const precio = libro.precio ? parseFloat(libro.precio).toFixed(2) : "0.00";

        card.innerHTML = `
          <div class="pi btn-fav-image" data-id="${libro.id}" data-titulo="${libro.titulo}" title="¡Click para añadir a favoritos!">
            <img src="/img/ejemplos.png" alt="${libro.titulo}">
            <div class="fav-overlay">❤️</div>
          </div>
          <div class="pf">
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Tipo:</strong> ${libro.tipo}</p>
            <p><strong>Código:</strong> ${libro.codigo}</p>
            <span class="pr">$${precio}</span>
            <button class="btn-agr" data-id="${libro.id}" data-titulo="${libro.titulo}" data-precio="${libro.precio}">Agregar al carrito</button>
          </div>
        `;

        grid.appendChild(card);
      });

      // Eventos para el carrito
      document.querySelectorAll(".btn-agr").forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
      });

      // EVENTO PARA FAVORITOS (Al hacer clic en la imagen)
      document.querySelectorAll(".btn-fav-image").forEach(imgCont => {
        imgCont.addEventListener("click", function() {
            const idLibro = this.dataset.id;
            const titulo = this.dataset.titulo;
            
            // Efecto visual de pulsación
            this.style.transform = "scale(0.95)";
            setTimeout(() => this.style.transform = "scale(1)", 100);

            // Llamar a la función que debe estar en favorites.js
            if (typeof agregarAFavoritos === 'function') {
                agregarAFavoritos(idLibro, titulo);
            } else {
                console.error("No se encontró la función agregarAFavoritos en favorites.js");
            }
        });
      });

    } catch (err) {
      console.error("Error al cargar libros:", err);
      grid.innerHTML = "<p style='text-align:center; padding:20px; color:red;'>Error al cargar los libros</p>";
    }
  }

  // --- FUNCIÓN CARRITO ---
  async function agregarAlCarrito(e) {
    const id = e.target.dataset.id;
    const titulo = e.target.dataset.titulo;
    
    try {
      const res = await fetch("/api/cart.php?action=add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, tipo: "libro" })
      });

      const data = await res.json();

      if (data.success) {
        alert(`${titulo} agregado al carrito`);
        actualizarContadorCarrito();
      } else {
        alert("Error: " + (data.error || "desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
    }
  }

  // --- ACTUALIZAR CONTADORES ---
  async function actualizarContadorCarrito() {
    try {
      const res = await fetch("/api/cart.php?action=count");
      const data = await res.json();
      const el = document.getElementById("cc");
      if(el) el.textContent = data.total || 0;
    } catch (err) {
      console.error("Error al actualizar carrito:", err);
    }
  }

  // --- BUSCADOR ---
  buscarInput?.addEventListener("input", e => {
    const termino = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".pc");

    cards.forEach(card => {
      const titulo = card.dataset.titulo;
      const autor = card.dataset.autor;
      const tipo = card.dataset.tipo;

      if (titulo.includes(termino) || autor.includes(termino) || tipo.includes(termino)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // --- FILTROS CHECKBOX ---
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const termino = checkbox.parentElement.querySelector("span").textContent.toLowerCase();
      const cards = document.querySelectorAll(".pc");

      cards.forEach(card => {
        const tipo = card.dataset.tipo;
        if (tipo.includes(termino)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  cargarLibros();
  actualizarContadorCarrito();
});