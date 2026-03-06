// adm-add.js
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("password").value.trim();

    if (!usuario || !contraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {

      const res = await fetch("/api/usuarios/agregar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario,
          contraseña
        })
      });

      const data = await res.json();

      if (data.success) {

        alert("Usuario agregado con ID " + data.id);
        form.reset();

      } else {

        alert("Error: " + (data.error || "Desconocido"));

      }

    } catch (err) {

      alert("Error de conexión: " + err.message);
      console.error(err);

    }

  });

});