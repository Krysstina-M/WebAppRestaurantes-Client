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
                <errorNomDir v-show="this.existe"></errorNomDir>
                <tr>
                    <td class="etq">Descripción</td>
                    <td>
                        <textarea v-model="restaurante.descripcion"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="etq">Imagen</td>
                    <td>
                        <input
                            type="file"
                            name="imagen"
                            accept="image/*"
                            ref="file"
                            @change="getImagen()"
                        />
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
                <errorS v-show="this.errorS"></errorS>
                <errorDB v-show="this.errorDB"></errorDB>
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
                nombre: "a",
                direccion: "a",
                descripcion: "",
                imagen: "",
                precio: "Medio",
                puntuacion: 0,
            },
            arrayNomDir: localStorage.getItem("arrayNomDir"),
            existe: 0,
            errorS: 0,
            errorDB: 0,
            img: "",
        };
    },
    methods: {
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.precio = "Medio";
            this.existe = 0;
            this.errorS = 0;
            this.errorDB = 0;
        },
        altaRestaurante() {
            var array = JSON.parse(this.arrayNomDir);
            this.existe = 0;
            this.errorS = 0;
            this.errorDB = 0;

            //-----------------------------------------------------------
            if (this.img != "") {
                console.log(this.img);

                //De Base64 a Blob
                var data = this.img.split("base64,")[1];
                var byteCharacters = atob(data);
                var byteNumbers = new Array(byteCharacters.length);

                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], {
                    type: "image/png",
                });

                console.log("Blob object", blob);

                ///De Blob a String
                this.restaurante.imagen = URL.createObjectURL(blob);
                
                console.log("Blob string", this.restaurante.imagen);
            }
            //-----------------------------------------------------------

            // for (var i in array) {
            //     if (
            //         (this.restaurante.nombre == array[i].nombre) &
            //         (this.restaurante.direccion == array[i].direccion)
            //     ) {
            //         this.existe = 1;
            //     }
            // }

            if (!this.existe) {
                axios
                    .post(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/create-restaurante",
                        JSON.stringify(this.restaurante)
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            console.info(respuesta.data.message);

                            /*this.$router
                                .push(
                                    "/ver-restaurante/" + respuesta.data.data.id
                                )
                                .catch((error) =>
                                    console.error(ERRORES.ERROR_REDIRIGIR)
                                );*/
                        } else {
                            console.error(respuesta.data);
                            this.errorDB = 1;
                        }
                    })
                    .catch((error) => {
                        console.error(ERRORES.ERROR_SERVER, error);
                        this.errorS = 1;
                    });
            }
        },
        getImagen() {
            //De PNG a Base64
            var reader = new FileReader();

            reader.readAsDataURL(this.$refs.file.files[0]);

            reader.onload = () => (this.img = reader.result);
        },
    },
};
</script>