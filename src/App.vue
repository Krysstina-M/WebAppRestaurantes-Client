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
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="navbar-collapse collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                to="/"
                                v-bind:class="{
                                    active: this.$route.path == '/',
                                }"
                                >Home</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                to="/get-restaurantes"
                                v-bind:class="{
                                    active:
                                        this.$route.path == '/get-restaurantes',
                                }"
                                >Restaurantes</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                to="/restaurante-destacado"
                                v-bind:class="{
                                    active:
                                        this.$route.path ==
                                        '/restaurante-destacado',
                                }"
                                >Restaurante destacado</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                to="/restaurante-random"
                                v-bind:class="{
                                    active:
                                        this.$route.path ==
                                        '/restaurante-random',
                                }"
                                ><a>¿Dónde comer?</a></router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                to="/contacto"
                                v-bind:class="{
                                    active: this.$route.path == '/contacto',
                                }"
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
//TODO añadir botón de ir atrás en verRestaurante
//TODO ponerle un border o algo al botón de ir pa' 'riba que casi no se ve
//TODO hacer un dark mode por el bien de mi vista
//TODO el icono de modificar en verRestaurante sale movido en el último  y primer restaurante
//TODO que la imagen se abra en modal
//TODO arreglar lo de los tamaños de pantalla
//TODO hacer login y registro
//TODO Meter imagen en la BD
import Vue from "vue";

//Componente de error del servidor
Vue.component("errorS", {
    template: `
    <div class="row justify-content-center">
        <div class="col-md">
            <input class="form-control text-center error" value="No se ha podido conectar con el servidor" />
        </div>
    </div>
`,
});

//Componente de error de base de datos
Vue.component("errorDB", {
    template: `
    <div class="row justify-content-center">
        <div class="col-md">
            <input class="form-control text-center error" value="No se ha podido conectar con la base de datos" />
        </div>
    </div>
`,
});

//Componente de error de restaurante existente
Vue.component("errorNomDir", {
    template: `
    <div class="row justify-content-center">
        <label class="col-md-2"></label>
        <div class="col-md-8">
            <input class="form-control text-center error" value="Este restaurante ya existe" />
        </div>
    </div>
`,
});

export default {
    name: "app",
    data() {
        return {
            titulo: "Restaurantes",
        };
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

.active {
    background-color: var(--main-gris);
    color: var(--bs-white);
}

.navbar-nav .nav-link.active {
    color: var(--bs-white);
}

/*Botones principales (los verdes)*/
.btn-primary {
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

/*Botones con iconos*/
.btn-icono-pq {
    font-size: 30px;
}

.btn-icono-gr {
    font-size: 50px;
}

.btn-icono-pq,
.btn-icono-gr {
    background-color: inherit;
    border: none;
}

.btn-icono-pq > a,
.btn-icono-gr > a {
    color: var(--main-gris);
}

.btn-icono-pq:hover,
.btn-icono-pq:focus,
.btn-icono-gr:hover,
.btn-icono-gr:focus {
    background-color: inherit;
    cursor: default;
}

.btn-icono-pq > a:hover,
.btn-icono-pq:focus > a,
.btn-icono-gr > a:hover,
.btn-icono-gr:focus > a {
    color: var(--main-verde);
    cursor: pointer;
}

/*Mensajes de error*/
.error {
    color: var(--bs-danger);
    border: none;
}

/*Círculo de loading que gira*/
.spinner-border {
    color: var(--main-gris);
}

/*Formulario*/
.caja-form {
    border: 5px solid var(--main-verde);
}

.form-control,
.form-select {
    border-color: var(--main-gris);
}

.form-control:focus,
.form-select:focus {
    border-color: var(--main-verde);
}

/*Estrellas puntuación*/
.checked {
    color: gold;
}

/*Links*/
a:link,
a:hover,
a:visited,
a:active {
    color: var(--main-gris);
    text-decoration: none;
}

/*Imagen*/
.img-fluid {
    height: 100%;
    width: 50%;
    transition: transform 0.25s ease;
}

.img-fluid:hover {
    -webkit-transform: scale(2);
    transform: scale(2);
}
</style>
