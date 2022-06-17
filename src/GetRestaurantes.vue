<template>
    <div id="div">
        <button class="alta">
            <router-link :to="{ name: 'alta-restaurante' }">
                <i class="fa-solid fa-plus"></i> Añadir nuevo
                restaurante</router-link
            >
        </button>
        <button class="ordenar" @click="ordenarPorCodigo()">
            <i
                :class="[
                    (seleccionado == 'codA')
                    | ((seleccionado == 'nomA') | (seleccionado == 'nomD'))
                        ? 'fa-solid fa-arrow-down-1-9'
                        : 'fa-solid fa-arrow-down-9-1',
                ]"
            ></i>
            Ordenar por código
        </button>
        <button class="ordenar" @click="ordenarPorNombre()">
            <i
                :class="[
                    (seleccionado == 'nomA')
                    | ((seleccionado == 'codA') | (seleccionado == 'codD'))
                        ? 'fa-solid fa-arrow-down-a-z'
                        : 'fa-solid fa-arrow-down-z-a',
                ]"
            ></i>
            Ordenar por nombre
        </button>
        <div class="lista">
            <ul id="GetRestaurantes" v-if="restaurantes != ''">
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
                            ><i class="fa-solid fa-eye"></i> Ver</router-link
                        >
                        <router-link
                            :to="{
                                name: 'modificar-restaurante',
                                params: { id: restaurante.id },
                            }"
                        >
                            <i class="fa-solid fa-pencil"></i>
                            Modificar</router-link
                        >
                        <span v-if="idEliminar != restaurante.id">
                            <!--Si NO se le ha dado click a "Eliminar", el botón NO desaparece"-->
                            <a @click="eliminarRestaurante(restaurante.id)"
                                ><i class="fa-solid fa-trash-can"></i>
                                Eliminar</a
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
            <p v-else-if="hay">Cargando restaurantes...</p>
            <p v-else-if="!hay & (!errorS & !errorDB)">No hay restaurantes</p>
            <p class="pError" v-else-if="errorS">
                No se ha podido conectar con el servidor. Inténtelo de nuevo más
                tarde
            </p>
            <p class="pError" v-else-if="errorDB">
                No se ha podido conectar con la base de datos
            </p>
            <button class="arriba" v-show="scrollpx > 400" @click="irArriba()">
                <a class="fa-solid fa-circle-arrow-up"></a>
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { CONST } from "./main";

export default {
    name: "getRestaurantes",
    data() {
        return {
            restaurantes: "",
            errorDB: 0,
            errorS: 0,
            hay: 1,
            timerCount: 5,
            seleccionado: "nomA",
            scrollpx: 0,
            idEliminar: "",
        };
    },
    mounted() {
        this.ordenarPorNombreAsc();

        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        ordenarPorNombre() {
            if (this.seleccionado == "nomA") this.ordenarPorNombreDesc();
            else if (this.seleccionado == "nomD") this.ordenarPorNombreAsc();

            if ((this.seleccionado == "codA") | (this.seleccionado == "codD"))
                this.ordenarPorNombreAsc();
        },
        ordenarPorNombreAsc() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurantes = respuesta.data.data;

                        this.seleccionado = "nomA";
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
        ordenarPorNombreDesc() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-nom-desc"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurantes = respuesta.data.data;

                        this.seleccionado = "nomD";
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
        ordenarPorCodigo() {
            if (this.seleccionado == "codA") this.ordenarPorCodigoDesc();
            else if (this.seleccionado == "codD") this.ordenarPorCodigoAsc();

            if ((this.seleccionado == "nomA") | (this.seleccionado == "nomD"))
                this.ordenarPorCodigoAsc();
        },
        ordenarPorCodigoAsc() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-cod-asc"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurantes = respuesta.data.data;

                        this.seleccionado = "codA";
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
        ordenarPorCodigoDesc() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-cod-desc"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurantes = respuesta.data.data;

                        this.seleccionado = "codD";
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
        handleScroll() {
            this.scrollpx = window.scrollY;
        },
        irArriba() {
            document
                .getElementById("div")
                .scrollIntoView({ behavior: "smooth" });
        },
        eliminarRestaurante(id) {
            this.idEliminar = id;
        },
        noBorrar() {
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

                        switch (this.seleccionado) {
                            case "nomD":
                                this.ordenarPorNombreDesc();
                                break;
                            case "codA":
                                this.ordenarPorCodigoAsc();
                                break;
                            case "codD":
                                this.ordenarPorCodigoDesc();
                                break;
                            default:
                                this.ordenarPorNombreAsc();
                                break;
                        }
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
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;

                        if (this.timerCount == 0) this.hay = 0;
                    }, 1000);
                }
            },
            immediate: true, // This ensures the watcher is triggered upon creation
        },
    },
};
</script>

<style>
/*Botón añadir restaurante*/
.alta {
    background: #42b983;
    border: 1px solid #2c3e50;
    margin-top: 20px;
    margin-right: -20%;
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
/*Botones ordenar restaurantes*/
.ordenar {
    background: #42b983;
    border: 1px solid #2c3e50;
    margin-top: 20px;
    margin-right: 20px;
    float: right;
    display: block;
    color: #2c3e50;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-size: 15px;
    font-weight: bold;
}
.ordenar:hover {
    background-color: #2c3e50;
    color: #42b983;
    cursor: pointer;
}
.ordenar:disabled {
    background: #2c3e50;
    color: #42b983;
    cursor: default;
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
    margin: -10px 0px 10px 0px;
    text-align: left;
}
/*Cajas de restaurantes (li)*/
.cajas {
    margin: 15px;
    width: 15%;
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