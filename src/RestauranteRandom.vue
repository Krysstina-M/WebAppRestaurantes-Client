<template>
    <div>
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
        <div class="restImg" v-if="restaurante != null">
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
    name: "restauranteRandom",
    data() {
        return {
            id: null,
            restaurante: "",
        };
    },
    mounted() {
        axios
            .get(
                "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante-random"
            )
            .then((respuesta) => {
                this.restaurante = respuesta.data.data;

                if (respuesta.data.status == "OK")
                    this.$router
                        .push("/restaurante-random/" + this.restaurante.id)
                        .catch((error) => {});
            });
    },
    methods: {
        refrescar() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante-random"
                )
                .then((respuesta) => {
                    this.restaurante = respuesta.data.data;

                    if (respuesta.data.status == "OK")
                        this.$router
                            .push("/restaurante-random/" + this.restaurante.id)
                            .catch((error) => {});
                });
        },
    },
    components: {
        Puntuacion,
    },
};
</script>

<style>
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