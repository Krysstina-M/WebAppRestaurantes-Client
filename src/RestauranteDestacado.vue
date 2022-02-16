<template>
    <div>
        <h2>El restaurante destacado es el nº {{ restaurante.id }}</h2>
        <div class="restImg" v-if="restaurante != null">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div class="divRest">
                <h3 class="nombreRestaurante" v-text="restaurante.nombre"></h3>
                <p v-text="restaurante.descripcion"></p>
                <h5 v-text="restaurante.direccion"></h5>
                <h6>Precio: {{ restaurante.precio }}</h6>
                <puntuacion :punt="restaurante.puntuacion"></puntuacion>
            </div>
            <div class="divImg" v-if="restaurante.imagen != null">
                <img
                    class="img"
                    :alt="restaurante.imagen.split('/').pop()"
                    :src="restaurante.imagen"
                />
            </div>
        </div>
        <p v-else>Cargando restaurante...</p>
    </div>
</template>

<script>
import axios from "axios";
import Puntuacion from "./Puntuacion.vue";

export default {
    name: "restauranteDestacado",
    data() {
        return {
            id: null,
            restaurante: "",
        };
    },
    mounted() {
        axios
            .get(
                "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante-destacado"
            )
            .then((respuesta) => {
                this.restaurante = respuesta.data.data;

                if (respuesta.data.status == "OK")
                    this.$router
                        .push("/restaurante-destacado/" + this.restaurante.id)
                        .catch((error) => {});
            });
    },
    components: {
        Puntuacion,
    },
};
</script>