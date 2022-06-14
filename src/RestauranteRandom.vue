<template>
    <div id="div" class="container-fluid">
        <p class="pError" v-if="errorS">
            No se ha podido conectar con el servidor. Inténtelo de nuevo más
            tarde.
        </p>
        <p class="pError" v-else-if="errorDB">
            No se ha podido conectar con la base de datos.
        </p>
        <div class="container-fluid" v-else-if="restaurante != ''">
            <h2>Estás viendo el restaurante nº {{ restaurante.id }}</h2>
            <div class="btn-group d-flex" role="group" aria-label="Group">
                <button class="btn btn-secondary" type="button">
                    <a class="bi bi-arrow-clockwise" @click="refrescar()"></a>
                </button>
            </div>
            <div class="row align-items-center">
                <div class="col">
                    <h3 v-text="restaurante.nombre"></h3>
                    <p v-text="restaurante.descripcion"></p>
                    <p v-text="restaurante.direccion"></p>
                    <p v-show="restaurante.precio">
                        Precio: {{ restaurante.precio }}
                    </p>
                    <puntuacion :punt="restaurante.puntuacion"></puntuacion>
                </div>
                <div class="col">
                    <a :href="restaurante.web" target="_blank"
                        ><img
                            class="img-fluid rounded"
                            :alt="errorImg"
                            :src="restaurante.imagen"
                    /></a>
                </div>
            </div>
        </div>
        <p v-else-if="noHay">El restaurante no existe</p>
        <p v-else>Cargando restaurante...</p>
    </div>
</template>

<script>
import axios from "axios";
import Puntuacion from "./Puntuacion.vue";
import { ERRORES } from "./main";

export default {
    name: "restauranteRandom",
    data() {
        return {
            id: "",
            restaurante: "",
            errorS: 0,
            errorDB: 0,
            errorImg: ERRORES.ERROR_IMG,
            noHay: 0,
            timerCount: 5,
        };
    },
    mounted() {
        this.getRestaurante();
    },
    methods: {
        getRestaurante() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante-random"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurante = respuesta.data.data;

                        if (
                            this.$router.currentRoute.params.id !==
                            this.restaurante.id
                        ) {
                            this.$router
                                .push(
                                    "/restaurante-random/" + this.restaurante.id
                                )
                                .catch(() =>
                                    console.error(ERRORES.ERROR_REDIRIGIR)
                                );
                        }
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
        refrescar() {
            this.getRestaurante();
        },
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;

                        if (this.timerCount == 0) this.noHay = 1;
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