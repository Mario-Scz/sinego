document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const codigo = document.getElementById("idL").value.trim();
    const autor = document.getElementById("aut").value.trim();
    const titulo = document.getElementById("libro").value.trim();
    const tipo = document.getElementById("tp").value.trim();

    if(!codigo || !autor || !titulo || !tipo){
      alert("Completa todos los campos");
      return;
    }

    try{

      const res = await fetch("/api/catalogo/agregar.php",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          codigo:codigo,
          autor:autor,
          titulo:titulo,
          tipo:tipo
        })
      });

      const data = await res.json();

      if(data.success){
        alert("Libro agregado");
        form.reset();
      }else{
        alert(data.error);
      }

    }catch(err){

      console.error(err);
      alert("Error de conexión");

    }

  });

});