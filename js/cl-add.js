document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelector(".fm");

form.addEventListener("submit", function(e){

e.preventDefault();

let nombre = document.getElementById("nombre").value;
let telefono = document.getElementById("telefono").value;
let correo = document.getElementById("correo").value;

fetch("/api/clientes/agregar.php", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
nombre,
telefono,
correo
})

})

.then(res => res.json())

.then(data => {

if(data.success){

alert("Cliente agregado correctamente");

window.location.href = "/vistas/cliente.php";

}else{

alert("Error al agregar cliente");

}

});

});

});