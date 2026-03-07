document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaLibros");
  const buscarInput = document.getElementById("buscarLibro");

  // Función para actualizar la tabla desde el servidor
  async function cargarLibros(query = "") {
    try {
      const res = await fetch(`/api/catalogo/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";
      data.forEach(libro => {
        const tr = document.createElement("tr");
        tr.dataset.id = libro.id;

        tr.innerHTML = `
          <td data-label="Código"><input type="text" class="codigo" value="${libro.codigo}"></td>
          <td data-label="Autor"><input type="text" class="autor" value="${libro.autor}"></td>
          <td data-label="Título"><input type="text" class="titulo" value="${libro.titulo}"></td>
          <td data-label="Tipo"><input type="text" class="tipo" value="${libro.tipo}"></td>
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
      console.error("Error al cargar libros:", err);
    }
  }

  // Cargar libros al inicio
  cargarLibros();

  // Buscar libros mientras escribes
  buscarInput?.addEventListener("input", e => {
    cargarLibros(e.target.value);
  });

  // Delegación de eventos para editar, guardar y eliminar
  tabla.addEventListener("click", async e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const id = tr.dataset.id;

    // EDITAR: mostrar botón guardar
    if (e.target.classList.contains("editar")) {
      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";
    }

    // GUARDAR: enviar cambios al servidor
    if (e.target.classList.contains("guardar")) {
      const autor = tr.querySelector(".autor").value.trim();
      const titulo = tr.querySelector(".titulo").value.trim();
      const codigo = tr.querySelector(".codigo").value.trim();
      const tipo = tr.querySelector(".tipo").value.trim();

      try {
        const res = await fetch("/api/catalogo/editar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, autor, titulo, codigo, tipo })
        });

        const data = await res.json();
        if (data.success) {
          alert("Libro actualizado");
          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";
        } else {
          alert("Error al actualizar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
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
          alert("Error al eliminar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
        console.error(err);
      }
    }
  });
});