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
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <h2>
                Hoy podrás comer o cenar en el restaurante nº
                {{ restaurante.id }}
            </h2>
            <button class="refresh">
                <a @click="refrescar()"><i class="fa fa-refresh"></i></a>
            </button>
            <div class="divRestImg">
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
        <p v-else-if="noHay">No hay restaurantes</p>
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

<style>
/*Botón refrescar*/
.refresh {
    border: none;
    background-color: inherit;
    font-size: 30px;
    transition: all 500ms ease;
}
.refresh:hover {
    transform: translate3d(0, 0, 0) rotate(70deg);
    transition: all 500ms ease;
}

.refresh a {
    text-decoration: none;
    color: #2c3e50;
}

.refresh a:hover {
    color: #42b983;
    cursor: pointer;
}
</style>