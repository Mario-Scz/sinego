document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".frm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id_libro = document.getElementById("idLibro").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const tipo_envio = document.getElementById("tipo").value.trim();

    if (!id_libro || !autor || !tipo_envio) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {

      const res = await fetch("/api/envios/agregar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_libro,
          autor,
          tipo_envio
        })
      });

      const data = await res.json();

      if (data.success) {

        alert("Envío agregado correctamente");

        form.reset();

        setTimeout(() => {
          window.location.href = "logistica.php";
        }, 800);

      } else {

        alert("Error: " + (data.error || "desconocido"));

      }

    } catch (err) {

      console.error(err);
      alert("Error de conexión con el servidor");

    }

  });

});