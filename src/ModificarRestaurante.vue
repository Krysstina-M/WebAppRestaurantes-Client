<template>
    <div>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <h2>Modificar un restaurante</h2>
        <div class="form">
            <a class="arrow left" href="/get-restaurantes"></a>
            <form @submit.prevent="guardarRestaurante">
                <p>
                    <label>Nombre</label>
                    <input type="text" v-model="restaurante.nombre" required />
                </p>
                <p>
                    <label>Dirección</label>
                    <input
                        type="text"
                        v-model="restaurante.direccion"
                        required
                    />
                </p>
                <p>
                    <label>Descripción</label>
                    <textarea v-model="restaurante.descripcion"></textarea>
                </p>
                <!-- <p>
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        multiple
                        accept="image/*"
                    />
                </p> -->
                <p>
                    <label>Link imagen</label>
                    <input type="text" v-model="restaurante.imagen" />
                    <button class="limpiar" @click.prevent="limpiar">
                        <a class="fa fa-close"></a>
                    </button>
                </p>
                <p>
                    <label for="precio">Precio:</label>
                    <select name="precio" v-model="restaurante.precio" required>
                        <option value=""></option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                    </select>
                </p>
                <input type="submit" value="Guardar restaurante" />
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "modificarRestaurante",
    data() {
        return {
            id: null,
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
            },
        };
    },
    mounted() {
        this.id = this.$route.params.id;

        axios
            .get(
                "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante/" +
                    this.id
            )
            .then((respuesta) => (this.restaurante = respuesta.data.data))
            .catch((error) => console.log(error.response.data));
    },
    methods: {
        limpiar() {
            this.restaurante.imagen = "";
        },
        guardarRestaurante() {
            //TODO que no se pueda dar de alta un nombre o dirección que ya existan
            var datos = JSON.stringify(this.restaurante);

            axios
                .post(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/update-restaurante/" +
                        this.id,
                    datos
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK")
                        this.$router
                            .push("/ver-restaurante/" + this.id)
                            .catch((error) => {});
                })
                .catch((error) => console.log(error.response.data));
        },
    },
};
</script>