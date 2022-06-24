<template>
    <div id="div" class="container-fluid">
        <h2>Introduce los datos del restaurante</h2>
        <div class="container-fluid caja-form w-50">
            <div class="row justify-content-between">
                <div class="col-2">
                    <button class="btn btn-icono-pq" type="button">
                        <a
                            class="bi bi-arrow-left"
                            href="/restaurantes"
                            tabindex="-1"
                        ></a>
                    </button>
                </div>
                <div class="col-2">
                    <button
                        class="btn btn-icono-pq"
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
                            name="precio"
                            v-model="restaurante.precio"
                        >
                            <option value=""></option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </div>
                </div>
                <errorDB v-if="errorDB"></errorDB>
                <errorS v-else-if="errorS"></errorS>
                <div
                    class="row justify-content-end mb-4"
                    v-if="idEliminar != restaurante.id"
                >
                    <div class="col-7">
                        <button class="btn btn-primary mt-2" type="submit">
                            Guardar restaurante
                        </button>
                    </div>

                    <div class="col-2">
                        <button class="btn btn-icono-pq">
                            <a
                                class="bi bi-trash-fill"
                                @click="eliminarRestaurante(restaurante.id)"
                            ></a>
                        </button>
                    </div>
                </div>
                <div class="container-fluid" v-else>
                    <!--Si se le ha dado click a "Eliminar", el botón desaparece"-->
                    <p>¿Estás seguro de que quieres borrarlo?</p>
                    <div class="btn-group gap-2 mb-4">
                        <button
                            class="btn btn-primary"
                            type="button"
                            @click="siBorrar(restaurante.id)"
                        >
                            Sí
                        </button>
                        <button
                            class="btn btn-primary"
                            type="button"
                            @click="noBorrar()"
                        >
                            No
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { CONST } from "./main";

export default {
    name: "modificarRestaurante",
    data() {
        return {
            id: "",
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
                web: "",
                precio: "",
            },
            existe: 0,
            errorDB: 0,
            errorS: 0,
            nomAnterior: "",
            dirAnterior: "",
            idEliminar: "",
        };
    },
    mounted() {
        this.id = this.$route.params.id;

        axios
            .get(
                "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante/" +
                    this.id
            )
            .then((respuesta) => {
                if (respuesta.data.status == "OK") {
                    this.restaurante = respuesta.data.data;

                    this.nomAnterior = this.restaurante.nombre;
                    this.dirAnterior = this.restaurante.direccion;
                } else {
                    this.$router
                        .push("/restaurantes/")
                        .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                }
            })
            .catch((error) => {
                console.error(CONST.ERROR_SERVER, error);
                this.errorS = 1;
            });
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
                        var restaurante = respuesta.data.data;

                        if (
                            (this.nomAnterior != this.restaurante.nombre) |
                            (this.dirAnterior != this.restaurante.direccion)
                        )
                            for (var i in restaurante)
                                if (
                                    (this.restaurante.nombre ==
                                        restaurante[i].nombre) &
                                    (this.restaurante.direccion ==
                                        restaurante[i].direccion)
                                )
                                    this.existe = 1;

                        if (!this.existe) this.guardarRestaurante();
                    } else {
                        console.error(CONST.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(CONST.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        guardarRestaurante() {
            axios
                .post(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/update-restaurante/" +
                        this.id,
                    JSON.stringify(this.restaurante)
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        console.info(respuesta.data.message);

                        this.$router
                            .push("/restaurante/" + this.id)
                            .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                    } else {
                        console.error(CONST.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(CONST.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.precio = "Medio";

            this.existe = 0;
            this.errorDB = 0;
            this.errorS = 0;
        },
        eliminarRestaurante(id) {
            this.idEliminar = id;
        },
        noBorrar() {
            this.errorDB = 0;
            this.errorS = 0;

            this.idEliminar = "";
        },
        siBorrar(id) {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/delete-restaurante/" +
                        id
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        console.info(respuesta.data.message);

                        this.idEliminar = "";

                        this.$router
                            .push({ path: "/restaurantes" })
                            .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                    } else {
                        console.error(CONST.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(CONST.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
    },
};
</script>