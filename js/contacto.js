"use strict";

const cargarContacto = () => {
    /**
     * HTML-CONTACTO
    **/

    //Se traen los elementos HTML
    let captcha_value = document.querySelector("#captcha_usuario");
    let captcha_aleatorio = document.querySelector("#captcha_aleatorio");
    let btn_captcha = document.querySelector("#actualizar_captcha");
    let btn_enviar = document.querySelector("#btn_enviar");
    let btn_validar = document.querySelector("#validar_captcha");
    let mensaje_validacion = document.querySelector("#mensaje_de_validacion");

    //Genera un numero aleatorio
    function numero_aleatorio() {
        let resultado = Math.floor((Math.random() * 100000));
        return resultado;
    }

    //inserta un número aleatorio en el input del html
    function mostrar_numero_aleatorio() {
        captcha_aleatorio.value = numero_aleatorio();
    }

    //Desactiva los botones y muestra un mensaje de validación exitosa con un color verde
    function validacionExitosa() {
        btn_enviar.classList.toggle('boton-desactivado');
        btn_enviar.disabled = false;
        btn_validar.disabled = true;
        btn_captcha.disabled = true;
        captcha_value.disabled = true;
        mensaje_validacion.innerHTML = "¡Correcto!";
        if (!mensaje_validacion.classList.contains('mensaje-error')) {
            mensaje_validacion.classList.toggle('mensaje-exito');
        } else {
            mensaje_validacion.classList.remove('mensaje-error');
            mensaje_validacion.classList.toggle('mensaje-exito');
        }
    }

    //Inserta un mensaje de error con un color rojo
    function validacionErronea() {
        mensaje_validacion.innerHTML = "¡Error!";
        if (!mensaje_validacion.classList.contains('mensaje-exito')) {
            mensaje_validacion.classList.add('mensaje-error');
        } else {
            mensaje_validacion.classList.remove('mensaje-exito')
            mensaje_validacion.classList.toggle('mensaje-error');
        }
    }

    //Valida que los valores de los inputs sean iguales
    function validar_captcha() {
        if (captcha_aleatorio.value === captcha_value.value) {
            validacionExitosa();
        } else {
            validacionErronea();
        }
    }

    //Llama a la función validar con un click
    btn_validar.addEventListener("click", function (e) {
        e.preventDefault();
        validar_captcha();
    });

    //Muestra un nuevo número aleatorio
    btn_captcha.addEventListener("click", function (e) {
        e.preventDefault();
        mostrar_numero_aleatorio();
        mensaje_validacion.innerHTML = "";
    });

    //Se carga un número aleatorio desde el inicio
    mostrar_numero_aleatorio();

    /**
     * FIN-HTML-CONTACTO
    **/
}