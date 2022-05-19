<template>
    <div>
        <h2>Introduce los datos del restaurante</h2>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <form @submit.prevent="altaRestaurante">
            <table class="form">
                <tr>
                    <td class="tdIconos">
                        <button class="atras">
                            <a
                                class="fa fa-chevron-left"
                                href="/get-restaurantes"
                            ></a>
                        </button>
                    </td>
                    <td class="tdIconos">
                        <button class="limpiar" @click.prevent="limpiar">
                            <a class="fa fa-eraser"></a>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td class="etq">Nombre</td>
                    <td>
                        <input
                            type="text"
                            v-model="restaurante.nombre"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td class="etq">Dirección</td>
                    <td class="dir">
                        <input
                            type="text"
                            v-model="restaurante.direccion"
                            required
                        />
                    </td>
                </tr>
                <errorNomDir v-if="this.existe"></errorNomDir>
                <tr>
                    <td class="etq">Descripción</td>
                    <td>
                        <textarea v-model="restaurante.descripcion"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="etq">Imagen</td>
                    <td>
                        <input type="text" v-model="restaurante.imagen" />
                    </td>
                </tr>
                <tr>
                    <td class="etq">Precio</td>
                    <td>
                        <select
                            name="precio"
                            v-model="restaurante.precio"
                            required
                        >
                            <option value=""></option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <input type="submit" value="Guardar restaurante" />
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "altaRestaurante",
    data() {
        return {
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
                precio: "Medio",
                puntuacion: 0,
            },
            existe: 0,
            arrayNomDir: localStorage.getItem("arrayNomDir"),
        };
    },
    methods: {
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.precio = "Medio";
        },
        altaRestaurante() {
            var array = JSON.parse(this.arrayNomDir);
            this.existe = 0;

            for (var i in array) {
                if (
                    (this.restaurante.nombre == array[i].nombre) &
                    (this.restaurante.direccion == array[i].direccion)
                ) {
                    this.existe = 1;
                }
            }

            if (!this.existe) {
                axios
                    .post(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/create-restaurante",
                        JSON.stringify(this.restaurante)
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            console.info(respuesta.data.message);

                            this.$router
                                .push(
                                    "/ver-restaurante/" + respuesta.data.data.id
                                )
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
                            this.$router
                                .push("/get-restaurantes/")
                                .catch((error) => {
                                    console.error(
                                        "Ha ocurrido un error al redirigir a la página: ",
                                        error
                                    );
                                });
                        }
                    })
                    .catch((error) =>
                        console.error("Ha ocurrido un error: ", error)
                    );
            }
        },
    },
};
</script>