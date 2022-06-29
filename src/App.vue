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
                        src="../dist/logo-blanco.png"
                        alt=""
                        width="30"
                        height="25"
                    />{{ titulo }}
                </a>
                <div class="form-group">
                    <label><i class="bi bi-sun-fill"></i></label>
                    <div class="form-check form-switch d-inline-block">
                        <input
                            class="form-check-input"
                            id="darkMode"
                            type="checkbox"
                            v-model="dark"
                        />
                        <i class="bi bi-moon-fill"></i>
                    </div>
                </div>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <i class="bi bi-list"></i>
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
                                to="/restaurantes"
                                v-bind:class="{
                                    active: this.$route.path == '/restaurantes',
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
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
//TODO las funciones que son iguales meterlas en un archivo aparte de js
//TODO los componentes que son iguales meterlas en un archivo aparte de js
//TODO arreglar lo de los tamaños de pantalla
//TODO hacer login y registro
//TODO Meter imagen en la BD
import Vue from "vue";

//Componente de error del servidor
Vue.component("errorS", {
    template: `
    <div class="row justify-content-center">
        <div class="col-md">
            <input class="form-control error text-center" value="No se ha podido conectar con el servidor" disabled/>
        </div>
    </div>
`,
});

//Componente de error de base de datos
Vue.component("errorDB", {
    template: `
    <div class="row justify-content-center">
        <div class="col-md">
            <input class="form-control error text-center error" value="No se ha podido conectar con la base de datos" disabled/>
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
            <input class="form-control error text-center error" value="Este restaurante ya existe" disabled/>
        </div>
    </div>
`,
});

export default {
    name: "app",
    data() {
        return {
            titulo: "Restaurantes",
            dark: 0,
            elSwitch: 1,
        };
    },
    mounted() {
        this.elSwitch = document.getElementById("darkMode");

        if (localStorage.dark == "true") {
            this.elSwitch.checked = true;
            document.body.classList.add("dark");
        } else {
            this.elSwitch.checked = false;
            document.body.classList.remove("dark");
        }
    },
    watch: {
        dark(dark) {
            localStorage.dark = dark;

            document.body.classList.toggle("dark");
        },
    },
};
</script>

<style>
:root {
    --main-verde: #42b983;
    --main-gris: #2c3e50;
    --main-negro: #232327;
    --main-border: 1px solid black;
}

/*Todo*/
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: var(--main-gris);
}

/*Transiciones*/
.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to {
    opacity: 0;
}

/*Focus*/
*:focus {
    outline: none !important;
    box-shadow: none !important;
}

/*Barra de navegación*/
.navbar {
    background-color: var(--main-verde);
    border: var(--main-border);
}

.navbar-toggler {
    font-size: 25px;
}

.nav-item > a:hover,
.nav-link:focus,
.navbar-nav .nav-link.active {
    background-color: var(--main-gris);
    color: white;
}

/*Links*/
a:link,
a:hover,
a:visited,
a:active {
    color: var(--main-gris);
    text-decoration: none;
}

/*Nombre restaurante*/
h3 > a:link,
h3 > a:visited,
h3 > a:active {
    color: var(--main-verde);
    text-decoration: none;
}

h3 > a:hover,
h3 > a:focus {
    color: var(--main-gris);
}

/*Botones principales (los verdes)*/
.btn-primary {
    background-color: var(--main-verde);
    color: var(--main-gris);
    border: var(--main-border);
    border-radius: 0;
}

.btn-primary:hover,
.btn-primary:focus {
    background-color: var(--main-gris);
    color: white;
}

.btn-primary:hover > a,
.btn-primary:focus > a {
    color: white;
}

/*Botones con iconos*/
.btn-icono-pq {
    font-size: 30px;
}

.btn-icono-gr,
.btn-up {
    font-size: 50px;
}

.btn-icono-pq,
.btn-icono-gr,
.btn-up {
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
.btn-icono-gr:focus,
.btn-up:hover,
.btn-up:focus {
    background-color: inherit;
    cursor: default;
}

.btn-icono-pq > a:hover,
.btn-icono-pq:focus > a,
.btn-icono-gr > a:hover,
.btn-icono-gr:focus > a,
.btn-up > a:hover,
.btn-up:focus > a {
    color: var(--main-verde);
    cursor: pointer;
}

.btn-up > a {
    color: var(--main-verde);
}

.btn-up > a:hover,
.btn-up:focus > a {
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
    background-color: whitesmoke;
}

textarea {
    max-height: 100px;
}

/*Mensajes de error*/
.error,
.form-control.error {
    color: red;
    border: none;
    background-color: inherit;
}

/*Círculo de loading que gira*/
.spinner-border {
    color: var(--main-gris);
}

/*Modal*/
.modal-header {
    background-color: var(--main-verde);
}

.modal-title > a:hover,
.modal-title > a:focus {
    color: white;
}

.bi-x-lg {
    border: none;
    background-color: inherit;
    font-size: 20px;
    color: var(--main-gris);
}

.bi-x-lg:hover,
.bi-x-lg:focus {
    color: white;
}

/*Imagen*/
.img-pq {
    height: 100%;
    width: 50%;
    transition: transform 0.25s ease;
}

.img-pq:hover {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    cursor: pointer;
}

/*Estrellas puntuación*/
.checked {
    color: gold;
}

/*Dark mode*/
.dark {
    background-color: var(--main-negro);
}

.dark #app {
    color: white;
}

.dark .navbar {
    background-color: var(--main-gris);
}

.dark .navbar-toggler {
    color: var(--main-verde);
    border-color: var(--main-verde);
}

.dark .nav-item > a:hover,
.dark .nav-link:focus,
.dark .navbar-nav .nav-link.active {
    background-color: var(--main-verde);
    color: black;
}

.dark a:link,
.dark a:hover,
.dark a:visited,
.dark a:active {
    color: var(--main-verde);
    text-decoration: none;
}

.dark h3 > a:link,
.dark h3 > a:visited,
.dark h3 > a:active {
    color: var(--main-verde);
}

.dark h3 > a:hover,
.dark h3 > a:focus {
    color: white;
}

.dark .btn-primary {
    background-color: var(--main-gris);
    color: var(--main-verde);
}

.dark .btn-primary:hover,
.dark .btn-primary:focus {
    background-color: var(--main-verde);
    color: black;
}

.dark .btn-primary:hover > a,
.dark .btn-primary:focus > a {
    color: black;
}

.dark .btn-icono-pq > a,
.dark .btn-icono-gr > a {
    color: var(--main-verde);
}

.dark .btn-icono-pq > a:hover,
.dark .btn-icono-pq:focus > a,
.dark .btn-icono-gr > a:hover,
.dark .btn-icono-gr:focus > a {
    color: white;
}

.dark .btn-up > a {
    color: var(--main-verde);
}

.dark .btn-up > a:hover,
.dark .btn-up:focus > a {
    color: var(--main-gris);
}

.dark .form-control :not(.error),
.dark .form-select :not(.error) {
    border-color: var(--main-verde);
    background-color: silver;
}

.dark .form-control:focus :not(.error),
.dark .form-select:focus :not(.error) {
    border-color: var(--main-gris);
    background-color: white;
}

.dark .spinner-border {
    color: var(--main-verde);
}

.dark .modal-header {
    background-color: var(--main-gris);
    color: var(--main-verde);
}

.dark .modal-title > a:hover {
    color: white;
}

.dark .modal-body {
    background-color: var(--main-negro);
}

.dark .bi-x-lg {
    color: var(--main-verde);
}

.dark .bi-x-lg:hover,
.dark .bi-x-lg:focus {
    color: white;
}
</style>
