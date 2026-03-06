document.addEventListener("DOMContentLoaded", () => {

  const tabla = document.querySelector(".td tbody");
  const buscarInput = document.querySelector(".ib");

  // Cargar catalogo
  async function cargarCatalogo(query = "") {

    try {

      const res = await fetch(`/api/catalogo/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";

      data.forEach(libro => {

        const tr = document.createElement("tr");
        tr.dataset.id = libro.id;

        tr.innerHTML = `
          <td data-label="Autor">
            <input type="text" class="autor" value="${libro.autor}">
          </td>

          <td data-label="Tipo">
            <input type="text" class="tipo" value="${libro.tipo}">
          </td>

          <td data-label="ID Libro">
            <input type="text" class="id_libro" value="${libro.id_libro}">
          </td>

          <td data-label="Acciones">
            <div class="ba">
              <button class="ba editar">✏️</button>
              <button class="ba guardar" style="display:none;">💾</button>
              <button class="ba eliminar">🗑️</button>
            </div>
          </td>
        `;

        tabla.appendChild(tr);

      });

    } catch (err) {
      console.error("Error al cargar catalogo:", err);
    }

  }

  // Cargar al iniciar
  cargarCatalogo();


  // Buscar
  buscarInput?.addEventListener("input", e => {
    cargarCatalogo(e.target.value);
  });


  // Delegación de eventos
  tabla.addEventListener("click", async e => {

    const tr = e.target.closest("tr");
    if (!tr) return;

    const id = tr.dataset.id;


    // EDITAR
    if (e.target.classList.contains("editar")) {

      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";

    }


    // GUARDAR
    if (e.target.classList.contains("guardar")) {

      const autor = tr.querySelector(".autor").value.trim();
      const tipo = tr.querySelector(".tipo").value.trim();
      const id_libro = tr.querySelector(".id_libro").value.trim();

      try {

        const res = await fetch("/api/catalogo/editar.php", {

          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            id,
            autor,
            tipo,
            id_libro
          })

        });

        const data = await res.json();

        if (data.success) {

          alert("Libro actualizado");

          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";

        } else {

          alert("Error: " + (data.error || "desconocido"));

        }

      } catch (err) {

        alert("Error de conexión");
        console.error(err);

      }

    }


    // ELIMINAR
    if (e.target.classList.contains("eliminar")) {

      if (!confirm("¿Eliminar libro?")) return;

      try {

        const res = await fetch("/api/catalogo/eliminar.php", {

          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ id })

        });

        const data = await res.json();

        if (data.success) {

          tr.remove();

        } else {

          alert("Error: " + (data.error || "desconocido"));

        }

      } catch (err) {

        alert("Error de conexión");
        console.error(err);

      }

    }

  });

});