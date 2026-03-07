document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".fm");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const codigo = document.getElementById("idL").value.trim();
    const autor = document.getElementById("aut").value.trim();
    const titulo = document.getElementById("libro").value.trim();
    const tipo = document.getElementById("tp").value.trim();
    const precio = document.getElementById("prc").value.trim() || "0.00";
    const imagenInput = document.getElementById("img");

    if (!codigo || !autor || !titulo || !tipo) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    if (isNaN(precio) || precio < 0) {
      alert("El precio debe ser un número válido");
      return;
    }

    const formData = new FormData();
    formData.append("codigo", codigo);
    formData.append("autor", autor);
    formData.append("titulo", titulo);
    formData.append("tipo", tipo);
    formData.append("precio", precio);

    if (imagenInput.files && imagenInput.files[0]) {
      formData.append("imagen", imagenInput.files[0]);
      console.log("✅ Imagen seleccionada:", imagenInput.files[0].name);
      console.log("✅ Tamaño:", imagenInput.files[0].size, "bytes");
      console.log("✅ Tipo:", imagenInput.files[0].type);
    } else {
      console.log("⚠️ Sin imagen seleccionada");
    }

    try {
      const res = await fetch("/api/catalogo/agregar.php", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("📦 Respuesta del servidor:", data);

      if (data.success) {
        if (data.imagen_subida) {
          alert("✅ Libro agregado con imagen: " + data.ruta_imagen);
        } else {
          alert("⚠️ Libro agregado sin imagen (usando imagen por defecto)");
        }
        form.reset();
      } else {
        alert("❌ Error: " + (data.error || "desconocido"));
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Error de conexión: " + err.message);
    }
  });
});