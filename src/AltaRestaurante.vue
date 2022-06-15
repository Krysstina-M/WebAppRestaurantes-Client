<template>
    <div id="div" class="container-fluid">
        <h2>Introduce los datos del restaurante</h2>
        <div class="container-fluid caja-form w-50">
            <div class="row justify-content-between">
                <div class="col-2">
                    <button class="btn btn-form" type="button">
                        <a
                            class="bi bi-arrow-left"
                            href="/get-restaurantes"
                            tabindex="-1"
                        ></a>
                    </button>
                </div>
                <div class="col-2">
                    <button
                        class="btn btn-form"
                        type="button"
                        @click.prevent="limpiar"
                    >
                        <a class="bi bi-eraser-fill"></a>
                    </button>
                </div>
            </div>
            <form @submit.prevent="comprobarNomDir">
                <div class="row justify-content-center mb-4">
                    <label class="col-md-2 col-form-label" for="nombre"
                        >Nombre</label
                    >
                    <div class="col-md-8">
                        <input
                            class="form-control"
                            id="nombre"
                            type="text"
                            minlength="1"
                            maxlength="50"
                            required
                            v-model="restaurante.nombre"
                        />
                    </div>
                </div>
                <div class="row justify-content-center">
                    <label class="col-md-2 col-form-label" for="direccion"
                        >Dirección</label
                    >
                    <div class="col-md-8">
                        <input
                            class="form-control"
                            id="direccion"
                            type="text"
                            minlength="1"
                            maxlength="50"
                            required
                            v-model="restaurante.direccion"
                        />
                    </div>
                </div>
                <errorNomDir v-show="existe"></errorNomDir>
                <div class="row justify-content-center my-4">
                    <label class="col-md-2 col-form-label" for="descripción"
                        >Descripción</label
                    >
                    <div class="col-md-8">
                        <textarea
                            class="form-control"
                            id="descripción"
                            type="text"
                            minlength="1"
                            maxlength="150"
                            rows="3"
                            v-model="restaurante.descripcion"
                        />
                    </div>
                </div>
                <div class="row justify-content-center mb-4">
                    <label class="col-md-2 col-form-label" for="imagen"
                        >Imagen</label
                    >
                    <div class="col-md-8">
                        <input
                            class="form-control"
                            id="imagen"
                            type="text"
                            minlength="1"
                            maxlength="250"
                            v-model="restaurante.imagen"
                        />
                    </div>
                </div>
                <div class="row justify-content-center mb-4">
                    <label class="col-md-2 col-form-label" for="web">Web</label>
                    <div class="col-md-8">
                        <input
                            class="form-control"
                            id="web"
                            type="text"
                            minlength="1"
                            maxlength="250"
                            v-model="restaurante.web"
                        />
                    </div>
                </div>
                <div class="row justify-content-center mb-4">
                    <label class="col-md-2 col-form-label" for="precio"
                        >Precio</label
                    >
                    <div class="col-md-8">
                        <select
                            class="form-select"
                            v-model="restaurante.precio"
                        >
                            <option selected></option>
                            <option value="bajo">Bajo</option>
                            <option value="medio">Medio</option>
                            <option value="alto">Alto</option>
                        </select>
                    </div>
                </div>
                <errorDB v-if="errorDB"></errorDB>
                <errorS v-else-if="errorS"></errorS>
                <div class="row justify-content-center mb-4">
                    <div class="col-md">
                        <button class="btn btn-primary" type="submit">
                            Guardar restaurante
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ERRORES } from "./main";

export default {
    name: "altaRestaurante",
    data() {
        return {
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
                web: "",
                precio: "",
                puntuacion: 0,
            },
            errorDB: 0,
            errorS: 0,
            existe: 0,
        };
    },
    methods: {
        comprobarNomDir() {
            this.existe = 0;

            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-nom-dir"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        for (var i in respuesta.data.data)
                            if (
                                (this.restaurante.nombre ==
                                    respuesta.data.data[i].nombre) &
                                (this.restaurante.direccion ==
                                    respuesta.data.data[i].direccion)
                            )
                                this.existe = 1;

                        if (!this.existe) this.altaRestaurante();
                    } else {
                        console.error(ERRORES.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(ERRORES.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        altaRestaurante() {
            axios
                .post(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/create-restaurante",
                    JSON.stringify(this.restaurante)
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        console.info(respuesta.data.message);

                        this.$router
                            .push("/ver-restaurante/" + respuesta.data.data.id)
                            .catch(() =>
                                console.error(ERRORES.ERROR_REDIRIGIR)
                            );
                    } else {
                        console.error(ERRORES.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(ERRORES.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.precio = "";
            this.existe = 0;
            this.errorDB = 0;
            this.errorS = 0;
        },
    },
};
</script>