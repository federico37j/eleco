
"use strict";

const cargarAdmin = () => {
    /**
     * HTML - ADMINISTRADOR
    **/
    let btn_cargar = document.querySelector("#btn-cargar");
    let btn_borrar_todo = document.querySelector("#btn-borrar-todo");
    let seccion_detalle = document.querySelector('#seccion-noticia');
    let file_imagen = document.querySelector("#file-noticia");
    let select_filtro = document.querySelector(".select_filtro");
    select_filtro.appendChild(cargarSelectTabla());
    select_filtro.addEventListener('change', filtroPorSeleccion);
    let cant_registros = document.querySelector("#cantidad-registros");
    let btn_pag_anterior = document.querySelector("#pag-anterior");
    btn_pag_anterior.addEventListener('click', anteriorPag);
    let btn_pag_siguiente = document.querySelector("#pag-siguiente");
    btn_pag_siguiente.addEventListener('click', siguientePag);
    cant_registros.addEventListener('change', paginado);
    btn_cargar.addEventListener("click", cargarNoticia);
    btn_borrar_todo.addEventListener("click", borrarTodo);
    document.querySelector("#btn-test").addEventListener("click", function () {
        testearTabla(3);
    });

    let nueva_imagen = '';
    let paginaActual = 1;
    //Datos iniciales
    let noticias = [
        // {
        // "titulo": "Una imprudente maniobra en avenida España",
        // "seccion": "policial",
        // "detalle": "Ayer por la tarde, un automóvil embistió a una moto",
        // "imagen": "https://res.cloudinary.com/dpqkhmplb/image/upload/v1625009337/accidente_ytjqas.jpg",
        // },
        // {
        // "titulo": "Condenaron al acusado de dejar morir a su amigo",
        // "seccion": "policial",
        // "detalle": "Tal se adelantó en ediciones pasadas, la tragedia que se había presentado como una muerte",
        // "imagen": "https://res.cloudinary.com/dpqkhmplb/image/upload/v1625009362/condenado-por-dejar-morir-a-su-amigo_kf4n56.jpg",
        // },
        // {
        //     "titulo": "Detuvieron a un hombre por venta de droga",
        //     "seccion": "policial",
        //     "detalle": "Personal de la Delegación del Tráfico de Drogas Ilícitas",
        //     "imagen": "https://res.cloudinary.com/dpqkhmplb/image/upload/v1625009376/detenido-por-venta-de-drogas_qvyl6o.webp",
        // }
    ];

    //API
    const URL_NOTICIAS = "https://60d1063d7de0b20017109faa.mockapi.io/api/noticias";

    //Hacemos un GET para traer las noticias de la API
    async function loadNoticias(url) {
        try {
            let response = await fetch(url);
            if (response.ok) {
                noticias = await response.json();
                mostrarNoticias(noticias);
            } else {
                console.log("Error - Failed URL!");
            }
        } catch (error) {
            console.log("Connection error");
        }
    }

    //Guardamos la imagen en la nube para usarla en cualquier parte
    file_imagen.addEventListener('change', async function (event) {
        try {
            const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dpqkhmplb/image/upload`;
            const CLOUDINARY_UPLOAD_PRESET = `FedAram37785`;

            if (event.target.files.length > 0) {
                const archivo = event.target.files[0];
                const formData = new FormData();
                formData.append('file', archivo);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                    .then((data) => {
                        if (data.secure_url !== '') {
                            nueva_imagen = data.secure_url;
                        }
                    })
                    .catch(err => console.error(err));
            }
        } catch (error) {
            console.log("Error: " + error);
        }

    });

    //Se carga una nueva noticia según lo cargado por el usuario en los inputs
    async function cargarNoticia() {
        let input_titulo = document.querySelector('#titulo-noticia').value;
        let input_detalle = document.querySelector('#detalle-noticia').value;
        let mensaje = document.querySelector('#mensaje');
        try {
            if (input_titulo != "" && input_detalle != "" && seccion_detalle != "") {
                let noticia = {
                    "titulo": input_titulo,
                    "seccion": seccion_detalle.value,
                    "detalle": input_detalle,
                    "imagen": nueva_imagen,
                }
                let respuesta = await fetch('https://60d1063d7de0b20017109faa.mockapi.io/api/noticias', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(noticia)
                });
                if (respuesta.ok) {
                    noticias.push(noticia);
                    nueva_imagen = '';
                    mensaje.innerHTML = '';
                    loadNoticias(URL_NOTICIAS);
                } else {
                    console.log('Hubo un error');
                }

            } else {
                mensaje.innerHTML = 'Recuerde completar todos los campos.';
                pintarMensajeError();
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    //Se muestra en pantalla el contenido del arreglo global
    function mostrarNoticias(noticias) {
        //Se trae la etiqueta tbody
        let t_body = document.querySelector('#tbody');
        //Vacio el HTML
        t_body.innerHTML = '';
        for (const NOTICIA of noticias) {
            //Almacena el ID de la noticia 
            let id_noticia = NOTICIA.id;
            //Se crea fila
            let fila = document.createElement('tr');
            //Resalta si la seccion es "el ultimo"
            if (NOTICIA.seccion === 'ultimo') {
                fila.classList.add('resaltar-fila');
            }
            //Se crean las celdas
            let celda_titulo = document.createElement('td');
            let celda_seccion = document.createElement('td');
            celda_seccion.classList.add('ocultar-seccion-admin');
            let celda_detalle = document.createElement('td');
            celda_detalle.classList.add('ocultar-detalles-admin');
            let celda_imagen = document.createElement('td');
            celda_imagen.classList.add('ocultar-img-admin');
            let celda_btn_editar = document.createElement('td');
            let celda_btn_eliminar = document.createElement('td');

            //Se crean los text area
            let textArea_titulo = document.createElement('textarea');
            let textArea_detalle = document.createElement('textarea');

            //Boton borrar
            let btn_eliminar = document.createElement('button');
            btn_eliminar.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon>`;
            btn_eliminar.setAttribute('data-id-borrar', id_noticia);
            btn_eliminar.classList.add('btn-borrar-noticia');

            //Boton editar
            let btn_editar = document.createElement('button');
            btn_editar.innerHTML = `<ion-icon name="sync-circle-outline"></ion-icon>`;
            btn_editar.setAttribute('data-id-editar', id_noticia);
            btn_editar.classList.add('btn-editar-noticia');

            //TextArea titulo y detalle
            textArea_titulo.id = `titulo-${id_noticia}`;
            textArea_detalle.id = `detalle-${id_noticia}`;
            textArea_titulo.value = NOTICIA.titulo;
            textArea_detalle.value = NOTICIA.detalle;

            //Creo un select
            let select_tabla = cargarSelectTabla();
            select_tabla.value = NOTICIA.seccion;
            select_tabla.id = `select-${id_noticia}`;

            //Se crea la img
            let img_noticia = document.createElement('img');
            img_noticia.id = `img-${id_noticia}`;
            img_noticia.src = NOTICIA.imagen;
            img_noticia.alt = NOTICIA.titulo;
            img_noticia.classList.add('img-principal');

            //Añado los hijos
            celda_imagen.appendChild(img_noticia);
            celda_btn_editar.appendChild(btn_editar);
            celda_btn_eliminar.appendChild(btn_eliminar);
            celda_titulo.appendChild(textArea_titulo);
            celda_seccion.appendChild(select_tabla);
            celda_detalle.appendChild(textArea_detalle);
            fila.appendChild(celda_titulo);
            fila.appendChild(celda_seccion);
            fila.appendChild(celda_detalle);
            fila.appendChild(celda_imagen);
            fila.appendChild(celda_btn_eliminar);
            fila.appendChild(celda_btn_editar);
            t_body.appendChild(fila);

            //Se vacían los inputs
            limpiarFormulario();
        }

        //Se le asigna los eventos a los botones
        let botonesBorrar = document.querySelectorAll(".btn-borrar-noticia");
        botonesBorrar.forEach(e => {
            e.addEventListener("click", btnBorrarClick);
        });

        let botonesEditar = document.querySelectorAll(".btn-editar-noticia");
        botonesEditar.forEach(e => {
            e.addEventListener("click", btnEditarClick);
        });
    }

    //Se borra una noticia
    async function btnBorrarClick() {
        let id = this.getAttribute("data-id-borrar");
        try {
            let response = await fetch(`https://60d1063d7de0b20017109faa.mockapi.io/api/noticias/${id}`, {
                'method': "DELETE",
            });

            if (response.ok) {
                console.log(`Elemento borrado ${id}`);
                loadNoticias(URL_NOTICIAS);
            } else {
                console.log("No se pudo borrar");
            }
        } catch (error) {
            console.log("Error: " + error);
        }

    }

    //Se actualiza una noticia
    async function btnEditarClick() {
        let id = this.getAttribute("data-id-editar");
        try {
            let noticia = {
                "titulo": document.querySelector(`#titulo-${id}`).value,
                "seccion": document.querySelector(`#select-${id}`).value,
                "detalle": document.querySelector(`#detalle-${id}`).value,
                "imagen": document.querySelector(`#img-${id}`).src,
            }

            let response = await fetch(`https://60d1063d7de0b20017109faa.mockapi.io/api/noticias/${id}`, {
                'method': "PUT",
                'headers': {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noticia)
            });

            if (response.ok) {
                console.log("Actualizado");
                loadNoticias(URL_NOTICIAS);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    //Cargar select para editar
    function cargarSelectTabla() {
        let select = document.createElement('select');
        for (let index = 0; index < seccion_detalle.options.length; index++) {
            let option = document.createElement('option');
            option.value = seccion_detalle.options[index].value;
            option.innerHTML = seccion_detalle.options[index].innerHTML;
            select.appendChild(option);
        }
        return select;
    }

    //Se vacían los inputs
    function limpiarFormulario() {
        document.querySelector("form").reset();
    }

    //Se vacía el arreglo global y se muestra el arreglo vacío en pantalla
    function borrarTodo() {
        noticias = [];
        mostrarNoticias(noticias);
    }

    //Testea la tabla agregando noticias según la cantidad de filas que le pasemos por parámetro
    function testearTabla(cantidadFilas) {
        let nuevaFila = {
            "titulo": "El Uranga Racing apunta a la mesopotamia",
            "seccion": "deporte",
            "detalle": "La capital de la provincia de Entre Rios, epicentro del quinto capítulo del Turismo de Carretera 2021",
            "imagen": "https://res.cloudinary.com/dpqkhmplb/image/upload/v1625009451/uranga-racing-mesopotamial_thmz3v.jpg"
        }
        crearNoticia(nuevaFila, cantidadFilas);
    }

    //Se le agrega estilo al mensaje mostrado en pantalla
    function pintarMensajeError() {
        mensaje.classList.add('mensaje-error');
    }

    //Se crea una nueva fila
    async function crearNoticia(nuevaFila, cantidadFilas) {
        try {
            for (let index = 0; index < cantidadFilas; index++) {
                let response = await fetch('https://60d1063d7de0b20017109faa.mockapi.io/api/noticias', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaFila)
                });
                if (response.ok) {
                    console.log(`Se han creado ${cantidadFilas} cantidad de filas`);
                    noticias.push(nuevaFila);
                    loadNoticias(URL_NOTICIAS);
                } else {
                    console.log("Error");
                }
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    //Segun el filtro es lo que se muestra
    function filtroPorSeleccion() {
        let resultadosFiltro = [];
        let seleccionUsuario = document.querySelector(".select_filtro select").value;
        if (seleccionUsuario !== 'ninguno') {
            for (let index = 0; index < noticias.length; index++) {
                if (noticias[index].seccion === seleccionUsuario) {
                    resultadosFiltro.push(noticias[index]);
                }
            }
            mostrarNoticias(resultadosFiltro);
        } else {
            mostrarNoticias(noticias);
        }
    }

    //Se filtra segun el paginado
    async function paginado() {
        let limite = Number(this.value);
        loadNoticias(retornarUrlSegunLimite(limite));
    }

    //Se incrementa en uno la variable global
    function siguientePag() {
        if (cant_registros.value != 0) {
            incrementar(1);
        }
    }

    //Se decrementa en uno la variable global
    function anteriorPag() {
        incrementar(-1);
    }

    //Segun el numero de pagina y el limite son los registros que se van a mostrar
    function incrementar(pag) {
        let limite = Number(cant_registros.value);
        if ((paginaActual > 1 && pag === -1) || (pag === 1)) {
            paginaActual += pag;
            loadNoticias(retornarUrlSegunLimite(limite));
        }
    }

    //Retorna la url necesaria para el get del paginado
    function retornarUrlSegunLimite(limite) {
        if (limite === 0) {
            return `https://60d1063d7de0b20017109faa.mockapi.io/api/noticias?page=${paginaActual}`;
        } else {
            return `https://60d1063d7de0b20017109faa.mockapi.io/api/noticias?page=${paginaActual}&limit=${limite}`;
        }
    }

    //Carga la tabla
    loadNoticias(URL_NOTICIAS);
}