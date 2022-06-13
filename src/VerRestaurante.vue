<template>
    <div>
        <p class="pError" v-if="errorS">
            No se ha podido conectar con el servidor. Inténtelo de nuevo más
            tarde.
        </p>
        <p class="pError" v-else-if="errorDB">
            No se ha podido conectar con la base de datos.
        </p>
        <div v-else-if="restaurante != ''">
            <h2>Estás viendo el restaurante nº {{ restaurante.id }}</h2>
            <button class="anterior">
                <a
                    v-if="restaurante.id > Number(idPrimero)"
                    @click="anterior()"
                    class="fa-solid fa-chevron-left"
                ></a>
            </button>
            <button class="siguiente">
                <a
                    v-if="restaurante.id < Number(idUltimo)"
                    @click="siguiente()"
                    class="fa-solid fa-chevron-right"
                ></a>
            </button>
            <div class="divRestImg ver">
                <div class="divRest">
                    <h3 class="nomRest" v-text="restaurante.nombre"></h3>
                    <p v-text="restaurante.descripcion"></p>
                    <h5 v-text="restaurante.direccion"></h5>
                    <h6 v-show="restaurante.precio">
                        Precio: {{ restaurante.precio }}
                    </h6>
                    <puntuacion :punt="restaurante.puntuacion"></puntuacion>
                </div>

                <div class="divImg" v-if="restaurante.imagen != null">
                    <a :href="restaurante.web" target="_blank"
                        ><img
                            class="img"
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
    name: "datosRestaurante",
    data() {
        return {
            id: "",
            restaurante: "",
            errorS: 0,
            errorDB: 0,
            errorImg: ERRORES.ERROR_IMG,
            noHay: 0,
            idPrimero: "",
            idAnterior: "",
            idUltimo: "",
            idSiguiente: "",
            timerCount: 5,
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
                        console.error(ERRORES.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(ERRORES.ERROR_SERVER, error);
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
                            ? (this.idSiguiente = arrayId[indexSiguiente].id)
                            : (this.idSiguiente = 0);
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
        anterior() {
            this.$router
                .push("/ver-restaurante/" + this.idAnterior)
                .catch(() => console.error(ERRORES.ERROR_REDIRIGIR));

            this.id = this.idAnterior;

            this.getRestaurante();
        },
        siguiente() {
            this.$router
                .push("/ver-restaurante/" + this.idSiguiente)
                .catch(() => console.error(ERRORES.ERROR_REDIRIGIR));

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

<style>
/*Flecha para ir al restaurante anterior*/
.anterior {
    border: none;
    background-color: inherit;
    font-size: 35px;
    margin-right: 10%;
}

.anterior a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.anterior a:hover {
    color: #42b983;
    cursor: pointer;
}

/*Flecha para ir al restaurante sguiente*/
.siguiente {
    border: none;
    background-color: inherit;
    font-size: 35px;
    margin-left: 10%;
}

.siguiente a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.siguiente a:hover {
    color: #42b983;
    cursor: pointer;
}
</style>