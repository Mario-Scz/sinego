document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {
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

    // Validar que precio sea un número válido
    if (isNaN(precio) || precio < 0) {
      alert("El precio debe ser un número válido");
      return;
    }

    // Crear FormData para enviar imagen
    const formData = new FormData();
    formData.append("codigo", codigo);
    formData.append("autor", autor);
    formData.append("titulo", titulo);
    formData.append("tipo", tipo);
    formData.append("precio", precio);

    if (imagenInput.files && imagenInput.files[0]) {
      formData.append("imagen", imagenInput.files[0]);
    }

    try {
      const res = await fetch("/api/catalogo/agregar.php", {
        method: "POST",
        body: formData
      });

      // Verificar si la respuesta es JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Respuesta no es JSON");
      }

      const data = await res.json();

      if (data.success) {
        alert(data.mensaje || "Libro agregado correctamente");
        form.reset();
      } else {
        alert("Error: " + (data.error || "desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
      console.error("Error completo:", err);
    }
  });
});