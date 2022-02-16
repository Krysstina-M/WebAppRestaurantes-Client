<template>
    <div>
        <h2>Introduce los datos del restaurante</h2>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class="form">
            <a class="arrow left" href="/get-restaurantes"></a>
            <form @submit.prevent="altaRestaurante">
                <div>
                    <label>Nombre</label>
                    <input type="text" v-model="restaurante.nombre" required />
                </div>
                <div>
                    <label>Dirección</label>
                    <input
                        type="text"
                        v-model="restaurante.direccion"
                        required
                    />
                </div>
                <div class="desc">
                    <label>Descripción</label>
                    <textarea v-model="restaurante.descripcion"></textarea>
                </div>
                <!-- <p>
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        multiple
                        accept="image/*"
                    />
                </p> -->
                <div>
                    <label>Link imagen</label>
                    <input type="text" v-model="restaurante.imagen" />
                    <button class="limpiar" @click.prevent="limpiar">
                        <a class="fa fa-close"></a>
                    </button>
                </div>
                <div>
                    <label>Precio:</label>
                    <select v-model="restaurante.precio" name="precio" required>
                        <option value=""></option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                    </select>
                </div>
                <input type="submit" value="Guardar restaurante" />
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "altaRestaurante",
    data() {
        return {
            id: null,
            nombre: "",
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
                precio: "Alto",
                puntuacion: 0,
            },
        };
    },
    methods: {
        limpiar() {
            this.restaurante.imagen = "";
        },
        altaRestaurante() {
            //TODO poner que cuando se dé de alta un restaurante, te lleve directamente a la página de ese restaurante
            //TODO que no se pueda dar de alta un nombre o dirección que ya existan

            var datos = JSON.stringify(this.restaurante);

            axios
                .post(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/create-restaurante",
                    datos
                )
                .then((respuesta) => {
                    this.restaurante = respuesta.data.data;

                    if (respuesta.data.status == "OK")
                        this.$router
                            .push("/get-restaurantes/")
                            .catch((error) => {});
                })
                .catch((error) => console.log(error.response.data));
        },
    },
};
</script>