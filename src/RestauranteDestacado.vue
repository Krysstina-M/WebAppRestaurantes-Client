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
            <h2>El restaurante destacado es el nº {{ restaurante.id }}</h2>
            <div class="divRestImg">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div class="divRest">
                    <h3 class="nomRest" v-text="restaurante.nombre"></h3>
                    <p v-text="restaurante.descripcion"></p>
                    <h5 v-text="restaurante.direccion"></h5>
                    <h6>Precio: {{ restaurante.precio }}</h6>
                    <puntuacion :punt="restaurante.puntuacion"></puntuacion>
                </div>
                <div class="divImg" v-if="restaurante.imagen != null">
                    <img
                        class="img"
                        :alt="errorImg"
                        :src="restaurante.imagen"
                    />
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
    name: "restauranteDestacado",
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
        axios
            .get(
                "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante-destacado"
            )
            .then((respuesta) => {
                if (respuesta.data.status == "OK") {
                    this.restaurante = respuesta.data.data;

                    this.$router
                        .push("/restaurante-destacado/" + this.restaurante.id)
                        .catch(() => console.error(ERRORES.ERROR_REDIRIGIR));
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