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
//TODO poner un ?sort=asc en get restuarantes
//TODO cuando haga el login y el registro poner las comprobaciones del user y pass en un watcher
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
    --main-verde: #42b983;
    --main-gris: #2c3e50;
    --main-border: 1px solid black;
}

/*Todo*/
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: var(--main-gris);
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

.nav-item > a:hover,
.nav-link:focus,
.navbar-nav .nav-link.active {
    background-color: var(--main-gris);
    color: white;
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

.btn-up > a {
    color: var(--main-verde);
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
.btn-icono-gr:focus > a {
    color: var(--main-verde);
    cursor: pointer;
}

.btn-up > a:hover,
.btn-up:focus > a {
    color: var(--main-gris);
    cursor: pointer;
}

/*Mensajes de error*/
.error {
    color: red;
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

/*Modal*/
.modal-header {
    background-color: var(--main-verde);
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
</style>
