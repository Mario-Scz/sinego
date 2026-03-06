document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("formFactura");

if(!form) return;

form.addEventListener("submit", async e => {

e.preventDefault();

const id_factura = document.getElementById("id_factura").value.trim();
const cliente = document.getElementById("cliente").value.trim();
const descripcion = document.getElementById("descripcion").value.trim();

if(!id_factura || !cliente || !descripcion){

alert("Completa todos los campos");
return;

}

try{

const res = await fetch("/api/facturas/agregar.php",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id_factura,cliente,descripcion})

});

const data = await res.json();

if(data.success){

alert("Factura agregada correctamente");
form.reset();

}else{

alert("Error: "+data.error);

}

}catch(err){

alert("Error de conexión");

}

});

});