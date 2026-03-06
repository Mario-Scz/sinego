document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".adm-add-frm");
  if (!form) return; // prevenir errores si el form no existe

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const usuario = document.querySelector("#usuario").value.trim();
    const contrasena = document.querySelector("#contrasena").value.trim();

    if (!usuario || !contrasena) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("/api/usuarios/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contraseña: contrasena })
      });

      const data = await res.json();

      if (data.success) {
        alert("Usuario agregado correctamente");
        form.reset();
      } else {
        alert("Error: " + (data.error || "desconocido"));
      }

    } catch (err) {
      alert("Error de conexión: " + err.message);
    }

  });

});