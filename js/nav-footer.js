"use strict";

/**
 * NAV
**/

let cont_bajo_header = document.querySelector('.contenedor-bajo-header');
let botonera = document.querySelector('.botonera');
let btn_menu = document.querySelector('#btn-menu-barras');

//Oculta o muestra el menú
btn_menu.addEventListener('click', function () {
    cont_bajo_header.classList.toggle('ocultar');
    botonera.classList.toggle('menu-responsive');
});

/**
 * FIN-NAV
**/

/**
 * FOOTER
**/

//Oculta o muestra contenido en "EL ECO y MÁS SECCIONES" el footer
let btn_footer_eleco = document.querySelector("#eleco-footer");
let footer_eleco_lista = document.querySelector("#eleco-social");
let btn_footer_mas_secciones = document.querySelector("#mas-secciones-footer");
let footer_mas_secciones_lista = document.querySelector("#mas-secciones-opciones");

btn_footer_eleco.addEventListener("click", function () {
    ocultar(btn_footer_eleco, footer_eleco_lista);
});
btn_footer_mas_secciones.addEventListener("click", function () {
    ocultar(btn_footer_mas_secciones, footer_mas_secciones_lista);
});

// let btn_footer_notas_recientes = document.querySelector("#notas-recientes-footer");
// let footer_notas_recientes_lista = document.querySelector("#notas-recientes-listado");

// btn_footer_notas_recientes.addEventListener("click", ocultar(btn_footer_notas_recientes, footer_notas_recientes_lista));

function ocultar(btn_listener, seccion_ocultar) {
    btn_listener.addEventListener("click", function () {
        seccion_ocultar.classList.toggle('ocultar');
    });
}

/**
 * FIN-FOOTER
**/

