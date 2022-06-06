<template>
    <div>
        <h2>Introduce los datos del restaurante</h2>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <form @submit.prevent="comprobarNomDir">
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
                            minlength="1"
                            maxlength="50"
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
                            minlength="1"
                            maxlength="50"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td class="etq">Descripción</td>
                    <td>
                        <textarea
                            v-model="restaurante.descripcion"
                            minlength="1"
                            maxlength="200"
                        ></textarea>
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
                        >
                            <option value=""></option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </td>
                </tr>
                <errorNomDir v-show="existe"></errorNomDir>
                <errorDB v-show="errorDB"></errorDB>
                <errorS v-show="errorS"></errorS>
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
import { ERRORES } from "./main";

export default {
    name: "altaRestaurante",
    data() {
        return {
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
                precio: "",
                puntuacion: 0,
            },
            errorDB: 0,
            errorS: 0,
            existe: 0,
        };
    },
    methods: {
        comprobarNomDir() {
            this.existe = 0;

            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-nom-dir"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        for (var i in respuesta.data.data)
                            if (
                                (this.restaurante.nombre ==
                                    respuesta.data.data[i].nombre) &
                                (this.restaurante.direccion ==
                                    respuesta.data.data[i].direccion)
                            )
                                this.existe = 1;
                    } else {
                        console.error(ERRORES.ERROR_DB);
                        this.errorDB = 1;
                    }

                    if (!this.existe) this.altaRestaurante();
                })
                .catch((error) => {
                    console.error(ERRORES.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        altaRestaurante() {
            axios
                .post(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/create-restaurante",
                    JSON.stringify(this.restaurante)
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        console.info(respuesta.data.message);

                        this.$router
                            .push("/ver-restaurante/" + respuesta.data.data.id)
                            .catch(() =>
                                console.error(ERRORES.ERROR_REDIRIGIR)
                            );
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
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.precio = "Medio";
            this.existe = 0;
            this.errorDB = 0;
            this.errorS = 0;
        },
    },
};
</script>