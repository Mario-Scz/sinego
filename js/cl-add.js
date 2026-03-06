document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".fm");

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;

        fetch("/api/clientes/agregar.php",{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                nombre:nombre,
                telefono:telefono,
                correo:correo
            })

        })
        .then(res=>res.json())
        .then(data=>{

            if(data.success){

                alert("Cliente agregado");

                form.reset();

            }else{

                alert("Error al agregar");

            }

        });

    });

});