<template>
    <div>
        <h2>Introduce los datos del restaurante</h2>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <form @submit.prevent="guardarRestaurante">
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
                    <td>
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
                    <td class="dir">
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
                                class="fa fa-trash-o"
                                @click="eliminarRestaurante(restaurante.id)"
                            ></a>
                        </button>
                        <span class="eliminar" v-else>
                            <!--Si se le ha dado click a "Eliminar", desaparece"-->
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
            },
            nomAnterior: "",
            dirAnterior: "",
            existe: 0,
            arrayNomDir: localStorage.getItem("arrayNomDir"),
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
                    console.error(
                        "Ha ocurrido un error: ",
                        respuesta.data.message
                    );
                    this.$router.push("/get-restaurantes/").catch((error) => {
                        console.error(
                            "Ha ocurrido un error al redirigir a la página: ",
                            error
                        );
                    });
                }
            })
            .catch((error) => console.error("Ha ocurrido un error: ", error));
    },
    methods: {
        limpiar() {
            this.restaurante.nombre = "";
            this.restaurante.direccion = "";
            this.restaurante.descripcion = "";
            this.restaurante.imagen = "";
            this.restaurante.precio = "Medio";
        },
        guardarRestaurante() {
            var datos = JSON.stringify(this.restaurante);
            var array = JSON.parse(this.arrayNomDir);
            this.existe = 0;

            if (
                (this.nomAnterior != this.restaurante.nombre) |
                (this.dirAnterior != this.restaurante.direccion)
            ) {
                for (var i in array) {
                    if (
                        (this.restaurante.nombre == array[i].nombre) &
                        (this.restaurante.direccion == array[i].direccion)
                    ) {
                        this.existe = 1;
                    }
                }
            }

            if (!this.existe) {
                axios
                    .post(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/update-restaurante/" +
                            this.id,
                        datos
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            console.info(respuesta.data.message);

                            this.$router
                                .push("/ver-restaurante/" + this.id)
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
                    .catch((error) =>
                        console.error("Ha ocurrido un error: ", error)
                    );
            }
        },
        eliminarRestaurante(id) {
            this.idEliminar = id;
        },
        noBorrar() {
            this.idEliminar = null;
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

                        this.idEliminar = null;

                        this.$router
                            .push({ path: "/get-restaurantes" })
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
                .catch((error) =>
                    console.error("Ha ocurrido un error: ", error)
                );
        },
    },
};
</script>

<style>
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