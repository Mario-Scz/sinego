document.querySelector(".fm").addEventListener("submit", async function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;

    const res = await fetch("/api/cliente/agregar.php",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            nombre:nombre,
            telefono:telefono,
            correo:correo
        })
    });

    const data = await res.json();

    if(data.success){
        alert(data.mensaje);
        window.location.href="/vistas/cliente.php";
    }else{
        alert(data.mensaje);
    }

});