<template>
    <div v-if="restaurante != null">
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
                    :alt="restaurante.imagen.split('/').pop()"
                    :src="restaurante.imagen"
                />
            </div>
        </div>
    </div>
    <p v-else>No hay restaurantes</p>
</template>

<script>
import axios from "axios";
import Puntuacion from "./Puntuacion.vue";

export default {
    name: "restauranteDestacado",
    data() {
        return {
            id: "",
            restaurante: null,
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
                        .catch((error) => {
                            console.error(
                                "Ha ocurrido un error al redirigir a la página: ",
                                error
                            );
                        });
                } else {
                    console.error(
                        "Ha ocurrido un error: ",
                        respuesta.data.message
                    );
                }
            })
            .catch((error) => console.error("Ha ocurrido un error: ", error));
    },
    components: {
        Puntuacion,
    },
};
</script>