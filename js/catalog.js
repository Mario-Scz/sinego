document.addEventListener("DOMContentLoaded", () => {

  const tabla = document.getElementById("tablaLibros");
  const buscarInput = document.getElementById("buscarLibro");

  async function cargarLibros(query = "") {

    try {

      const res = await fetch(`/api/catalogo/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";

      data.forEach(libro => {

        const tr = document.createElement("tr");
        tr.dataset.id = libro.id;

        tr.innerHTML = `
          <td data-label="Código">
            <input type="text" class="codigo" value="${libro.codigo}">
          </td>

          <td data-label="Autor">
            <input type="text" class="autor" value="${libro.autor}">
          </td>

          <td data-label="Título">
            <input type="text" class="titulo" value="${libro.titulo}">
          </td>

          <td data-label="Tipo">
            <input type="text" class="tipo" value="${libro.tipo}">
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

    } catch(err){

      console.error("Error cargando libros:",err);

    }

  }

  cargarLibros();

  buscarInput?.addEventListener("input", e => {
    cargarLibros(e.target.value);
  });

  tabla.addEventListener("click", async e => {

    const tr = e.target.closest("tr");
    if(!tr) return;

    const id = tr.dataset.id;

    if(e.target.classList.contains("editar")){

      tr.querySelector(".guardar").style.display="inline-block";
      e.target.style.display="none";

    }

    if(e.target.classList.contains("guardar")){

      const codigo = tr.querySelector(".codigo").value.trim();
      const autor = tr.querySelector(".autor").value.trim();
      const titulo = tr.querySelector(".titulo").value.trim();
      const tipo = tr.querySelector(".tipo").value.trim();

      try{

        const res = await fetch("/api/catalogo/editar.php",{

          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            id,
            codigo,
            autor,
            titulo,
            tipo
          })

        });

        const data = await res.json();

        if(data.success){

          alert("Libro actualizado");

          tr.querySelector(".editar").style.display="inline-block";
          e.target.style.display="none";

        }else{

          alert("Error: "+data.error);

        }

      }catch(err){

        alert("Error de conexión");

      }

    }

    if(e.target.classList.contains("eliminar")){

      if(!confirm("¿Eliminar libro?")) return;

      try{

        const res = await fetch("/api/catalogo/eliminar.php",{

          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id})

        });

        const data = await res.json();

        if(data.success){

          tr.remove();

        }else{

          alert("Error: "+data.error);

        }

      }catch(err){

        alert("Error de conexión");

      }

    }

  });

});