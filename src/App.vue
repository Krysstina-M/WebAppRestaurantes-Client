<template>
    <div id="app" class="container-fluid mt-5">
        <nav class="navbar navbar-expand-lg fixed-top py-0">
            <div class="container-fluid">
                <a
                    class="navbar-brand"
                    href="https://vuejs.org/"
                    target="_blank"
                    tabindex="-1"
                >
                    <img
                        class="d-inline-block align-text-center me-2"
                        src="./assets/logo-blanco.png"
                        alt=""
                        width="30"
                        height="25"
                    />{{ titulo }}
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="navbar-collapse collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/"
                                >Home</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/get-restaurantes"
                                >Restaurantes</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{
                                    name: 'restaurante-destacado',
                                    params: { id: 0 },
                                }"
                                >Restaurante destacado</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{
                                    name: 'restaurante-random',
                                    params: { id: 0 },
                                }"
                                ><a>¿Dónde comer?</a></router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/contacto"
                                >Contacto</router-link
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <img src="../dist/logo.png" />

        <!--Router-->
        <router-view></router-view>
    </div>
</template>

<script>
//TODO revisar mensajes de error
//TODO quitar lo de i en los iconos y route link y poner directamente el nombre de la clase
//TODO hacer que el título del restaurante lleve a su página web
//TODO que la imagen se abra en modal
//FIXME tienes que pulsar un a o un router-link para que te lleve a la página en vez de pulsar en cualquier lado del botón
//TODO meter bootstrap?
//TODO lo de active en el navbar
//TODO hacer login y registro
//TODO Meter imagen en la BD
//FIXME No funciona en git
import Vue from "vue";

//Componente de error del servidor
Vue.component("errorS", {
    template: `
    <tr>
        <td></td>
        <td class="tdError">
            <input class="error" value="No se ha podido conectar con el servidor." disabled/>
        </td>
    </tr>
`,
});

//Componente de error de base de datos
Vue.component("errorDB", {
    template: `
    <tr>
        <td></td>
        <td class="tdError">
            <input class="error" value="No se ha podido conectar con la base de datos." disabled/>
        </td>
    </tr>
`,
});

//Componente de error de restaurante existente
Vue.component("errorNomDir", {
    template: `
    <tr>
        <td></td>
        <td class="tdError">
            <input class="error" value="Este restaurante ya existe" disabled/>
        </td>
    </tr>
`,
});

export default {
    name: "app",
    data() {
        return {
            titulo: "Restaurantes",
        };
    },
    mounted() {
        /*var header = document.getElementById("app");
        var btns = header.getElementsByClassName("nav-item");

        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(
                    " active",
                    ""
                );
                this.className += " active";
            });
        }*/
    },
};
</script>

<style>
:root {
    --bs-blue: #0d6efd;
    --bs-indigo: #6610f2;
    --bs-purple: #6f42c1;
    --bs-pink: #d63384;
    --bs-red: #dc3545;
    --bs-orange: #fd7e14;
    --bs-yellow: #ffc107;
    --bs-green: #198754;
    --bs-teal: #20c997;
    --bs-cyan: #0dcaf0;
    --bs-black: #000;
    --bs-white: #fff;
    --bs-gray: #6c757d;
    --bs-gray-dark: #343a40;
    --bs-gray-100: #f8f9fa;
    --bs-gray-200: #e9ecef;
    --bs-gray-300: #dee2e6;
    --bs-gray-400: #ced4da;
    --bs-gray-500: #adb5bd;
    --bs-gray-600: #6c757d;
    --bs-gray-700: #495057;
    --bs-gray-800: #343a40;
    --bs-gray-900: #212529;
    --bs-primary: #0d6efd;
    --bs-secondary: #6c757d;
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #dc3545;
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    --bs-primary-rgb: 13, 110, 253;
    --bs-secondary-rgb: 108, 117, 125;
    --bs-success-rgb: 25, 135, 84;
    --bs-info-rgb: 13, 202, 240;
    --bs-warning-rgb: 255, 193, 7;
    --bs-danger-rgb: 220, 53, 69;
    --bs-light-rgb: 248, 249, 250;
    --bs-dark-rgb: 33, 37, 41;
    --bs-white-rgb: 255, 255, 255;
    --bs-black-rgb: 0, 0, 0;
    --bs-body-color-rgb: 33, 37, 41;
    --bs-body-bg-rgb: 255, 255, 255;
    --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto,
        "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        "Noto Color Emoji";
    --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace;
    --bs-gradient: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0)
    );
    --bs-body-font-family: var(--bs-font-sans-serif);
    --bs-body-font-size: 1rem;
    --bs-body-font-weight: 400;
    --bs-body-line-height: 1.5;
    --bs-body-color: #212529;
    --bs-body-bg: #fff;
    --bs-border-width: 1px;
    --bs-border-style: solid;
    --bs-border-color: #dee2e6;
    --bs-border-color-translucent: rgba(0, 0, 0, 0.175);
    --bs-border-radius: 0.375rem;
    --bs-border-radius-sm: 0.25rem;
    --bs-border-radius-lg: 0.5rem;
    --bs-border-radius-xl: 1rem;
    --bs-border-radius-2xl: 2rem;
    --bs-border-radius-pill: 50rem;
    --bs-heading-color: ;
    --bs-link-color: #0d6efd;
    --bs-link-hover-color: #0a58ca;
    --bs-code-color: #d63384;
    --bs-highlight-bg: #fff3cd;
    /*-----------------------------------------------------*/
    --main-verde: #42b983;
    --main-gris: #2c3e50;
    --main-border: 1px solid black;
    --main-border-radius: 25px;
}

/*Todo*/
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
}

*:focus {
    outline: none !important;
    box-shadow: none !important;
}

/*Barra de navegación*/
.navbar {
    background-color: var(--main-verde);
    border: var(--main-border);
}

.nav-item > a:hover {
    background-color: var(--main-gris);
    color: var(--bs-white);
}

.nav-link:focus {
    background-color: var(--main-gris);
    color: var(--bs-white);
}

/*Botones principales*/
.btn-primary:not(:disabled) {
    background-color: var(--main-verde);
    color: var(--main-gris);
    border: var(--main-border);
    border-radius: 0;
}

.btn-primary > a {
    color: var(--main-gris);
    text-decoration: none;
}

.btn-primary:hover,
.btn-primary:focus {
    background-color: var(--main-gris);
    color: var(--bs-white);
}

.btn-primary:hover > a,
.btn-primary:focus > a {
    color: var(--bs-white);
}

/*AltaRestaurante + ModificarRestaurante*/
/*Flecha izquierda*/
.atras {
    border: none;
    background-color: inherit;
    font-size: 35px;
    float: left;
    margin-right: 10px;
}

.atras a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.atras a:hover {
    color: #42b983;
    cursor: pointer;
}

/*Columna del botón limpiar*/
.tdIconos {
    padding: 0px;
}

/*Botón limpiar*/
.limpiar {
    border: none;
    background-color: inherit;
    font-size: 30px;
    float: right;
    margin-right: 10px;
}

.limpiar a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.limpiar a:hover {
    color: #42b983;
    cursor: pointer;
}

/*Caja formulario*/
.form {
    border: 5px solid #42b983;
    margin: auto;
    margin-top: -10px;
    width: 40%;
}

/*Formulario, filas y columnas*/
.form tr,
td {
    padding: 10px 0px 10px 0px;
}

/*Etiquetas*/
.etq {
    text-align: right;
}

/*Input de dirección*/
.dir {
    padding-bottom: 0px;
}

/*Textarea de descripción*/
textarea {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 13px;
    border-radius: 20px;
}

/*Resto de campos*/
input[type="text"],
textarea,
select {
    border: solid #2c3e50 1px;
    border-radius: 25px;
    padding: 5px;
    width: 80%;
    background-color: white;
    max-width: 730px;
    max-height: 130px;
}

/*Columna del mensaje de error*/
.tdError {
    padding-top: 0px;
}

/*Mensaje de error*/
.error {
    color: firebrick;
    background-color: #ffcccc;
    border: none;
    border-radius: 5px;
    width: 80%;
}

/*Botón guardar*/
input[type="submit"] {
    background: #42b983;
    border: 1px solid #2c3e50;
    margin: 10px;
    padding: 10px;
    color: #2c3e50;
    font-size: 15px;
    font-weight: bold;
}

input[type="submit"]:hover {
    background-color: #2c3e50;
    color: #42b983;
    cursor: pointer;
}

/*VerRestaurante + RestauranteDestacado + RestauranteRandom*/
/*Mensaje error servidor + BD*/
.pError {
    color: firebrick;
    background-color: #ffcccc;
    font-size: 30px;
    border-radius: 5px;
    width: 40%;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: auto;
    margin-right: auto;
}

/*Botones ir atrás y adelante y refrescar*/
.btn-link {
    background-color: inherit;
    border: none;
    font-size: 50px;
}

.btn-link > a {
    color: var(--main-gris);
}

.btn-link:hover,
.btn-link:focus {
    background-color: inherit;
}

.btn-link:hover > a,
.btn-link:focus > a {
    color: var(--main-verde);
}

/*Estrellas puntuación*/
.checked {
    color: gold;
}

/*Imagen*/
.img-fluid {
    height: 100%;
    width: 50%;
}

.img-fluid:hover {
    -webkit-transform: scale(2);
    transform: scale(2);
    transition: transform 0.25s ease;
}
</style>
