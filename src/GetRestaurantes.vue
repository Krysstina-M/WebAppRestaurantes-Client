<template>
    <div id="div">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div>
            <button class="alta">
                <router-link :to="{ name: 'alta-restaurante' }">
                    <i class="fa fa-plus"></i> Añadir nuevo
                    restaurante</router-link
                >
            </button>
        </div>
        <div class="lista">
            <ul id="GetRestaurantes" v-if="restaurantes != null">
                <li
                    class="cajas"
                    v-for="restaurante in restaurantes"
                    :key="restaurante.id"
                >
                    <h6 class="id">{{ restaurante.id }}</h6>
                    <b>{{ restaurante.nombre }}</b>
                    <p>
                        <router-link
                            :to="{
                                name: 'ver-restaurante',
                                params: {
                                    id: restaurante.id,
                                },
                            }"
                            ><i class="fa fa-eye"></i> Ver</router-link
                        >
                        <router-link
                            :to="{
                                name: 'modificar-restaurante',
                                params: { id: restaurante.id },
                            }"
                        >
                            <i class="fa fa-pencil"></i> Modificar</router-link
                        >
                        <span v-if="idEliminar != restaurante.id">
                            <!--Si NO se le ha dado click a "Eliminar", el botón NO desaparece"-->
                            <a @click="eliminarRestaurante(restaurante.id)"
                                ><i class="fa fa-trash-o"></i> Eliminar</a
                            >
                        </span>
                        <span class="eliminar" v-else>
                            <!--Si se le ha dado click a "Eliminar", el botón desaparece"-->
                            <p>¿Estás seguro de que quieres borrarlo?</p>
                            <button @click="siBorrar(restaurante.id)">
                                Sí
                            </button>
                            <button @click="noBorrar()">No</button>
                        </span>
                    </p>
                </li>
            </ul>
            <p v-else>Cargando restaurantes...</p>
            <button
                class="arriba"
                v-show="this.scrollpx > 400"
                @click="irArriba()"
            >
                <a class="fa fa-arrow-circle-up"></a>
            </button>
        </div>
    </div>
</template>

<script>
//TODO que se pueda ordenar por nombre, número o puntuación
import axios from "axios";
import error from "./main.js"

export default {
    name: "getRestaurantes",
    data() {
        return {
            restaurantes: null,
            idEliminar: "",
            scrollpx: 0,
        };
    },
    mounted() {
        this.getRestaurantes();

        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        getRestaurantes() {
            var arrayId = [];
            var arrayNomDir = [];
            var nomDir = {};

            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurantes = respuesta.data.data;

                        for (var i in this.restaurantes) {
                            arrayId[i] = Object.values(this.restaurantes)[i].id;

                            nomDir.nombre = Object.values(this.restaurantes)[
                                i
                            ].nombre;
                            nomDir.direccion = Object.values(this.restaurantes)[
                                i
                            ].direccion;

                            arrayNomDir.push(
                                JSON.parse(JSON.stringify(nomDir))
                            );
                        }

                        this.arrayId = arrayId.sort(function (a, b) {
                            return a - b;
                        });

                        localStorage.setItem("arrayId", arrayId);
                        localStorage.setItem(
                            "arrayNomDir",
                            JSON.stringify(arrayNomDir)
                        );
                    }
                });
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
                        this.getRestaurantes();
                    }
                })
                .catch((error) =>
                    console.error(
                        "Ha ocurrido un error: ",
                        error.data.message,
                        " - ",
                        error
                    )
                );
        },
        irArriba() {
            document
                .getElementById("div")
                .scrollIntoView({ behavior: "smooth" });
        },
        handleScroll() {
            this.scrollpx = window.scrollY;
        }
    },
};
</script>

<style>
/*Botón añadir restaurante*/
.alta {
    background: #42b983;
    border: 1px solid #2c3e50;
    margin-top: 20px;
}

.alta a {
    display: block;
    color: #2c3e50;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-size: 15px;
    font-weight: bold;
}

.alta a:hover {
    color: #42b983;
}

.alta:hover {
    background-color: #2c3e50;
}

/*Lista de restaurantes*/
.lista ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

/*ID de arriba a la izquierda*/
.id {
    margin: -20px 0px 10px 0px;
    text-align: left;
}

/*Cajas de restaurantes (li)*/
.cajas {
    margin: 20px;
    width: 20%;
    border: 1px solid #2c3e50;
    border-radius: 25px;
    background: whitesmoke;
    padding: 30px;
    text-align: center;
    list-style-type: none;
    font-size: 20px;
}

.cajas a {
    display: block;
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
    color: #2c3e50;
    background: #42b983;
    text-align: center;
    border: 1px solid #2c3e50;
    margin: 10px 20px;
    padding: 5px;
    font-weight: bold;
}

.cajas a:hover {
    background-color: #2c3e50;
    color: white;
}

/*Botón para ir arriba del todo*/
.arriba {
    border: none;
    background-color: inherit;
    font-size: 50px;
    float: right;
    position: fixed;
    bottom: 0px;
    right: 0px;
}

.arriba a {
    text-decoration: none;
    color: #42b983;
    transition: all 200ms ease;
}

.arriba a:hover {
    color: #2c3e50;
    cursor: pointer;
}
</style>