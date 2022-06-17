<template>
    <div>
        <div v-if="restaurante != ''">
            <h2>El restaurante destacado es el nº {{ restaurante.id }}</h2>
            <div class="divRestImg">
                <div class="divRest">
                    <h3 class="nomRest">
                        <a
                            class="web"
                            :href="restaurante.web"
                            target="_blank"
                            >{{ restaurante.nombre }}</a
                        >
                    </h3>
                    <p v-text="restaurante.descripcion"></p>
                    <h5 v-text="restaurante.direccion"></h5>
                    <h6 v-show="restaurante.precio">
                        Precio: {{ restaurante.precio }}
                    </h6>
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
        <p v-else-if="hay">Cargando restaurante...</p>
        <p v-else-if="!hay & (!errorS & !errorDB)">No hay restaurantes</p>
        <p class="pError" v-else-if="errorS">
            No se ha podido conectar con el servidor. Inténtelo de nuevo más
            tarde.
        </p>
        <p class="pError" v-else-if="errorDB">
            No se ha podido conectar con la base de datos.
        </p>
    </div>
</template>

<script>
import axios from "axios";
import Puntuacion from "./Puntuacion.vue";
import { CONST } from "./main";

export default {
    name: "restauranteDestacado",
    data() {
        return {
            id: "",
            restaurante: "",
            errorS: 0,
            errorDB: 0,
            errorImg: CONST.ERROR_IMG,
            hay: 1,
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
                        .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                } else {
                    console.error(CONST.ERROR_DB);
                    this.errorDB = 1;
                }
            })
            .catch((error) => {
                console.error(CONST.ERROR_SERVER, error);
                error.toString().includes("500")
                    ? (this.hay = 0)
                    : (this.errorS = 1);
            });
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