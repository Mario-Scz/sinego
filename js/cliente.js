document.addEventListener("DOMContentLoaded", () => {

    cargarClientes();

    const buscador = document.querySelector(".ib");

    buscador.addEventListener("keyup", function(){
        buscarCliente(this.value);
    });

});


/* ===============================
CARGAR CLIENTES
=============================== */

function cargarClientes(){

    fetch("/api/clientes/consultar.php")
    .then(res => res.json())
    .then(data => {

        pintarTabla(data);

    });

}


/* ===============================
PINTAR TABLA
=============================== */

function pintarTabla(data){

    const tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    data.forEach(cliente => {

        tabla.innerHTML += `
        <tr data-id="${cliente.id}">
            <td><input type="text" value="${cliente.nombre}" disabled></td>
            <td><input type="text" value="${cliente.telefono}" disabled></td>
            <td><input type="email" value="${cliente.correo}" disabled></td>
            <td>
                <div class="ba">
                    <button class="ba editar">✏️</button>
                    <button class="ba guardar" style="display:none;">💾</button>
                    <button class="ba eliminar">🗑️</button>
                </div>
            </td>
        </tr>
        `;

    });

    activarBotones();

}


/* ===============================
ACTIVAR BOTONES
=============================== */

function activarBotones(){

    document.querySelectorAll(".editar").forEach(btn => {

        btn.addEventListener("click", function(){

            const fila = this.closest("tr");

            fila.querySelectorAll("input").forEach(input=>{
                input.disabled = false;
            });

            fila.querySelector(".guardar").style.display="inline";
            this.style.display="none";

        });

    });


    document.querySelectorAll(".guardar").forEach(btn => {

        btn.addEventListener("click", function(){

            const fila = this.closest("tr");

            const id = fila.dataset.id;
            const nombre = fila.children[0].children[0].value;
            const telefono = fila.children[1].children[0].value;
            const correo = fila.children[2].children[0].value;

            editarCliente(id,nombre,telefono,correo);

        });

    });


    document.querySelectorAll(".eliminar").forEach(btn => {

        btn.addEventListener("click", function(){

            const fila = this.closest("tr");
            const id = fila.dataset.id;

            eliminarCliente(id,fila);

        });

    });

}


/* ===============================
EDITAR CLIENTE
=============================== */

function editarCliente(id,nombre,telefono,correo){

    fetch("/api/clientes/editar.php",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            id:id,
            nombre:nombre,
            telefono:telefono,
            correo:correo
        })

    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Cliente actualizado");

            cargarClientes();

        }else{

            alert("Error al actualizar");

        }

    });

}


/* ===============================
ELIMINAR CLIENTE
=============================== */

function eliminarCliente(id,fila){

    if(!confirm("¿Eliminar cliente?")) return;

    fetch("/api/clientes/eliminar.php",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            id:id
        })

    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            fila.remove();

        }else{

            alert("Error al eliminar");

        }

    });

}


/* ===============================
BUSCADOR EN TIEMPO REAL
=============================== */

function buscarCliente(texto){

    fetch("/api/clientes/consultar.php")
    .then(res=>res.json())
    .then(data=>{

        const filtrados = data.filter(cliente =>

            cliente.nombre.toLowerCase().includes(texto.toLowerCase()) ||
            cliente.correo.toLowerCase().includes(texto.toLowerCase())

        );

        pintarTabla(filtrados);

    });

}