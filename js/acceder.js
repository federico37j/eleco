"use strict";

const cargarAcceder = () => {
    /**
    * HTML-ACCEDER
    **/
    let input_email = document.querySelector('#input-email');
    let input_password = document.querySelector('#input-password');
    let btn_iniciar = document.querySelector('#btn-iniciar');
    let mensaje = document.querySelector('.mensaje');

    btn_iniciar.addEventListener('click', function (e) {
        e.preventDefault();

        //JSON con datos del admin
        let administrador = {
            "email": "admin",
            "password": "admin"
        }

        if (input_email.value.length != 0 && input_password.value.length != 0) {
            //Compara lo ingresado por el usuario con las credenciarles del administrador
            if (input_email.value === administrador.email && input_password.value === administrador.password) {
                //redirecciona al html administrador
                // window.location = './administrador.html';
            } else {
                mensaje.innerHTML = 'Usted no es administrador.';
                pintarMensajeError();
            }
        } else {
            mensaje.innerHTML = 'Al menos uno de los campos esta vacio.';
            pintarMensajeError();
        }

    });

    //Se pinta el mensaje de error
    function pintarMensajeError() {
        mensaje.classList.add('mensaje-error');
    }

}