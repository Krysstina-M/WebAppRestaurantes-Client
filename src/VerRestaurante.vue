<template>
    <div>
        <p class="pError" v-if="this.errorS">
            No se ha podido conectar con el servidor. Inténtelo de nuevo más
            tarde.
        </p>
        <p class="pError" v-else-if="this.errorBD">
            No se ha podido conectar con la base de datos.
        </p>
        <div v-else-if="restaurante != ''">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <h2>Estás viendo el restaurante nº {{ restaurante.id }}</h2>
            <button class="anterior">
                <a
                    v-if="restaurante.id > Number(this.idPrimero)"
                    @click="anterior()"
                    class="fa fa-chevron-left"
                ></a>
            </button>
            <button class="siguiente">
                <a
                    v-if="restaurante.id < Number(this.idUltimo)"
                    @click="siguiente()"
                    class="fa fa-chevron-right"
                ></a>
            </button>
            <div class="divRestImg ver">
                <div class="divRest">
                    <h3 class="nomRest" v-text="restaurante.nombre"></h3>
                    <p v-text="restaurante.descripcion"></p>
                    <h5 v-text="restaurante.direccion"></h5>
                    <h6>Precio: {{ restaurante.precio }}</h6>
                    <puntuacion :punt="restaurante.puntuacion"></puntuacion>
                </div>

                <div class="divImg" v-if="restaurante.imagen != null">
                    <img class="img" :alt="this.errorImg" :src="this.imagen" />
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
            idPrimero: "",
            idAnterior: "",
            idUltimo: "",
            idSiguiente: "",
            arrayId: localStorage.getItem("arrayId").split(","),
            errorS: 0,
            errorBD: 0,
            errorImg: ERRORES.ERROR_IMG,
            timerCount: 5,
            noHay: 0,
        };
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

                        //-----------------------------------------------------------------
                        console.log("Blob 2:", this.restaurante.imagen);

                        if (this.restaurante.imagen != null) {
                            this.imagen =
                                "data:image/png;base64," +
                                btoa(this.restaurante.imagen);
                            console.log("Base64 2:", this.imagen);
                        }
                        //-----------------------------------------------------------------

                        this.idPrimero = this.arrayId[0];
                        this.idUltimo = this.arrayId[this.arrayId.length - 1];

                        if (this.idAnterior == null)
                            this.idAnterior = this.idUltimo;
                        else
                            this.idAnterior =
                                this.arrayId[this.arrayId.indexOf(this.id) - 1];

                        this.idSiguiente =
                            this.arrayId[this.arrayId.indexOf(this.id) + 1];
                    } else if (respuesta.data.status != "error") {
                        console.error(ERRORES.ERROR_BD);
                        this.errorBD = 1;
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
                .catch((error) => console.error(ERRORES.ERROR_REDIRIGIR));
            this.id = this.idAnterior;

            this.getRestaurante();
        },
        siguiente() {
            this.$router
                .push("/ver-restaurante/" + this.idSiguiente)
                .catch((error) => console.error(ERRORES.ERROR_REDIRIGIR));
            this.id = this.idSiguiente;
            
            this.getRestaurante();
        },
    },
    mounted() {
        this.id = this.$route.params.id;
        this.getRestaurante();
    },
    components: {
        Puntuacion,
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
};
</script>

<style>
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