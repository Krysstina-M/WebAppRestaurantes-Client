<template>
    <div id="div" class="container-fluid">
        <div class="container-fluid" v-if="restaurante != ''">
            <h2>Estás viendo el restaurante nº {{ restaurante.id }}</h2>
            <div class="btn-group d-flex">
                <button class="btn btn-secondary" type="button">
                    <a
                        class="bi bi-arrow-left"
                        v-if="restaurante.id > Number(idPrimero)"
                        @click="anterior()"
                    ></a>
                </button>
                <!--  -->
                <button class="btn btn-form" type="button">
                    <router-link
                        class="bi bi-pencil-fill"
                        tabindex="-1"
                        :to="{
                            name: 'modificar-restaurante',
                            params: { id: restaurante.id },
                        }"
                    >
                    </router-link>
                </button>
                <!--  -->
                <button class="btn btn-secondary" type="button">
                    <a
                        class="bi bi-arrow-right"
                        v-if="restaurante.id < Number(idUltimo)"
                        @click="siguiente()"
                    ></a>
                </button>
            </div>
            <div class="row align-items-center">
                <div class="col">
                    <h3>
                        <a :href="restaurante.web" target="_blank">{{
                            restaurante.nombre
                        }}</a>
                    </h3>
                    <p v-text="restaurante.descripcion"></p>
                    <p v-text="restaurante.direccion"></p>
                    <p v-show="restaurante.precio">
                        Precio: {{ restaurante.precio }}
                    </p>
                    <puntuacion :punt="restaurante.puntuacion"></puntuacion>
                </div>
                <div class="col">
                    <img
                        class="img-fluid rounded"
                        :alt="errorImg"
                        :src="restaurante.imagen"
                    />
                </div>
            </div>
        </div>
        <div class="spinner-border" role="status" v-else-if="hay">
            <span class="visually-hidden">Cargando restaurantes...</span>
        </div>
        <p v-else-if="!hay & (!errorS & !errorDB)">El restaurante no existe</p>
        <p class="error" v-else-if="errorS">
            No se ha podido conectar con el servidor. Inténtelo de nuevo más
            tarde.
        </p>
        <p class="error" v-else-if="errorDB">
            No se ha podido conectar con la base de datos.
        </p>
    </div>
</template>

<script>
import axios from "axios";
import Puntuacion from "./Puntuacion.vue";
import { CONST } from "./main";

export default {
    name: "datosRestaurante",
    data() {
        return {
            id: "",
            restaurante: "",
            errorS: 0,
            errorDB: 0,
            errorImg: CONST.ERROR_IMG,
            hay: 1,
            timerCount: 5,
            idPrimero: "",
            idAnterior: "",
            idUltimo: "",
            idSiguiente: "",
        };
    },
    mounted() {
        this.id = this.$route.params.id;

        this.getRestaurante();
    },
    methods: {
        getRestaurante() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante/" +
                        this.id
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurante = respuesta.data.data;

                        this.getIds();
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
        getIds() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-id"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        var arrayId = respuesta.data.data;

                        if (arrayId.length != 0) {
                            var indexAnterior =
                                arrayId
                                    .map((object) => object.id)
                                    .indexOf(this.id) - 1;
                            var indexSiguiente =
                                arrayId
                                    .map((object) => object.id)
                                    .indexOf(this.id) + 1;

                            this.idPrimero = arrayId[0].id;
                            this.idUltimo = arrayId[arrayId.length - 1].id;

                            this.id != this.idPrimero
                                ? (this.idAnterior = arrayId[indexAnterior].id)
                                : (this.idAnterior = 0);

                            this.id != this.idUltimo
                                ? (this.idSiguiente =
                                      arrayId[indexSiguiente].id)
                                : (this.idSiguiente = 0);
                        }
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
        anterior() {
            this.$router
                .push("/ver-restaurante/" + this.idAnterior)
                .catch(() => console.error(CONST.ERROR_REDIRIGIR));

            this.id = this.idAnterior;

            this.getRestaurante();
        },
        siguiente() {
            this.$router
                .push("/ver-restaurante/" + this.idSiguiente)
                .catch(() => console.error(CONST.ERROR_REDIRIGIR));

            this.id = this.idSiguiente;

            this.getRestaurante();
        },
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;

                        if (this.timerCount == 0) this.hay = 0;
                    }, 1000);
                }
            },
            immediate: true, // This ensures the watcher is triggered upon creation
        },
    },
    components: {
        Puntuacion,
    },
};
</script>