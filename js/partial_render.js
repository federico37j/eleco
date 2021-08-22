"use strict";

document.addEventListener('DOMContentLoaded', function () {
    let botonesNav = document.querySelectorAll(".botonera li a");
    botonesNav.forEach(e => {
        e.addEventListener("click", loadPaginaClick);
    });
    cargarHome();
})

let container = document.querySelector("#contenido");
//Segun la seleccion se carga el contenido de la pagina
function loadPaginaClick(e) {
    e.preventDefault();
    let selecion = this.dataset.url;
    fetch(`${selecion}.html`)
        .then(response => {
            response.text().then(text => {
                container.innerHTML = text;
                switch (selecion) {
                    case "contacto":
                        cargarContacto();
                        break;
                    case "acceder":
                        cargarAcceder();
                        break;
                    case "administrador":
                        cargarAdmin();
                        break;
                }
            });
        })
        .catch(error => {
            console.log(error);
            container.innerHTML = "<h1>Error - Connection Failed!</h1>";
        });
}

//Carga el Home por defecto
function cargarHome() {
    fetch(`home.html`)
        .then(response => {
            response.text().then(text => {
                container.innerHTML = text;
            });
        })
        .catch(error => {
            console.log(error);
            container.innerHTML = "<h1>Error - Connection Failed!</h1>";
        });
}
