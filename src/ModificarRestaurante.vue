<template>
    <div>
        <h2>Introduce los datos del restaurante</h2>
        <form @submit.prevent="comprobarNomDir">
            <table class="form">
                <tr>
                    <td class="tdIconos">
                        <button class="atras">
                            <a
                                class="fa-solid fa-chevron-left"
                                href="/get-restaurantes"
                            ></a>
                        </button>
                    </td>
                    <td class="tdIconos">
                        <button class="limpiar" @click.prevent="limpiar">
                            <a class="fa-solid fa-eraser"></a>
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
                <errorNomDir v-show="existe"></errorNomDir>
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
                    <td class="etq">Web</td>
                    <td>
                        <input type="text" v-model="restaurante.web" />
                    </td>
                </tr>
                <tr>
                    <td class="etq">Precio</td>
                    <td>
                        <select name="precio" v-model="restaurante.precio">
                            <option value=""></option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </select>
                    </td>
                </tr>
                <errorDB v-show="errorDB"></errorDB>
                <errorS v-show="errorS"></errorS>
                <tr>
                    <td colspan="3">
                        <input
                            v-if="idEliminar != restaurante.id"
                            type="submit"
                            value="Guardar restaurante"
                        />
                        <button
                            class="borrar"
                            v-if="idEliminar != restaurante.id"
                        >
                            <a
                                class="fa-solid fa-trash-can"
                                @click="eliminarRestaurante(restaurante.id)"
                            ></a>
                        </button>
                        <span class="eliminar" v-else>
                            <!--Si se le ha dado click a "Eliminar", desaparece-->
                            <p>¿Estás seguro de que quieres borrarlo?</p>
                            <button @click.prevent="siBorrar(restaurante.id)">
                                Sí
                            </button>
                            <button @click="noBorrar()">No</button>
                        </span>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { CONST } from "./main";

export default {
    name: "modificarRestaurante",
    data() {
        return {
            id: "",
            restaurante: {
                nombre: "",
                direccion: "",
                descripcion: "",
                imagen: "",
                web: "",
                precio: "",
            },
            existe: 0,
            errorDB: 0,
            errorS: 0,
            nomAnterior: "",
            dirAnterior: "",
            idEliminar: "",
        };
    },
    mounted() {
        this.id = this.$route.params.id;

        axios
            .get(
                "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurante/" +
                    this.id
            )
            .then((respuesta) => {
                if (respuesta.data.status == "OK") {
                    this.restaurante = respuesta.data.data;

                    this.nomAnterior = this.restaurante.nombre;
                    this.dirAnterior = this.restaurante.direccion;
                } else {
                    this.$router
                        .push("/get-restaurantes/")
                        .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                }
            })
            .catch((error) => {
                console.error(CONST.ERROR_SERVER, error);
                this.errorS = 1;
            });
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
                        var restaurante = respuesta.data.data;

                        if (
                            (this.nomAnterior != this.restaurante.nombre) |
                            (this.dirAnterior != this.restaurante.direccion)
                        )
                            for (var i in restaurante)
                                if (
                                    (this.restaurante.nombre ==
                                        restaurante[i].nombre) &
                                    (this.restaurante.direccion ==
                                        restaurante[i].direccion)
                                )
                                    this.existe = 1;

                        if (!this.existe) this.guardarRestaurante();
                    } else {
                        console.error(CONST.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(CONST.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        guardarRestaurante() {
            axios
                .post(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/update-restaurante/" +
                        this.id,
                    JSON.stringify(this.restaurante)
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        console.info(respuesta.data.message);

                        this.$router
                            .push("/ver-restaurante/" + this.id)
                            .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                    } else {
                        console.error(CONST.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(CONST.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.web = "";
            this.restaurante.precio = "";

            this.existe = 0;
            this.errorDB = 0;
            this.errorS = 0;
        },
        eliminarRestaurante(id) {
            this.idEliminar = id;
        },
        noBorrar() {
            this.errorDB = 0;
            this.errorS = 0;

            this.idEliminar = "";
        },
        siBorrar(id) {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/delete-restaurante/" +
                        id
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        console.info(respuesta.data.message);

                        this.idEliminar = "";

                        this.$router
                            .push({ path: "/get-restaurantes" })
                            .catch(() => console.error(CONST.ERROR_REDIRIGIR));
                    } else {
                        console.error(CONST.ERROR_DB);
                        this.errorDB = 1;
                    }
                })
                .catch((error) => {
                    console.error(CONST.ERROR_SERVER, error);
                    this.errorS = 1;
                });
        },
    },
};
</script>

<style>
/*Icono papelera*/
.borrar {
    border: none;
    background-color: inherit;
    font-size: 30px;
    float: right;
    margin: 10px 10px 0px -10px;
}

.borrar a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.borrar a:hover {
    color: #42b983;
    cursor: pointer;
}
</style>