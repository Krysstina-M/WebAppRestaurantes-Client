<template>
    <div id="div" class="container-fluid">
        <div class="btn-toolbar justify-content-between">
            <div class="btn-group ms-5" aria-label="First group">
                <button class="btn btn-primary" type="button">
                    <router-link
                        class="bi bi-plus-lg"
                        tabindex="-1"
                        :to="{ name: 'alta-restaurante' }"
                    >
                        Añadir nuevo restaurante
                    </router-link>
                </button>
            </div>
            <div class="btn-group me-5" aria-label="Second group">
                <button
                    class="btn btn-primary me-2"
                    type="button"
                    @click="ordenarPorNombre()"
                >
                    <i
                        :class="[
                            (seleccionado == 'nomA')
                            | ((seleccionado == 'codA')
                                | (seleccionado == 'codD'))
                                ? 'bi bi-sort-alpha-down'
                                : 'bi bi-sort-alpha-up',
                        ]"
                    ></i>
                    Ordenar por nombre
                </button>
                <button
                    class="btn btn-primary ms-2"
                    type="button"
                    @click="ordenarPorCodigo()"
                >
                    <i
                        :class="[
                            (seleccionado == 'codA')
                            | ((seleccionado == 'nomA')
                                | (seleccionado == 'nomD'))
                                ? 'bi bi-sort-numeric-down'
                                : 'bi bi-sort-numeric-up',
                        ]"
                    ></i>
                    Ordenar por código
                </button>
            </div>
        </div>

        <div class="container-fluid mt-4">
            <div
                id="GetRestaurantes"
                class="row row-cols-6 justify-content-center"
                v-if="restaurantes != ''"
            >
                <div
                    class="col caja p-4 m-2"
                    v-for="restaurante in restaurantes"
                    :key="restaurante.id"
                >
                    <h6 class="text-start id">{{ restaurante.id }}</h6>
                    <h5>{{ restaurante.nombre }}</h5>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button">
                            <router-link
                                class="bi bi-eye-fill"
                                tabindex="-1"
                                :to="{
                                    name: 'ver-restaurante',
                                    params: {
                                        id: restaurante.id,
                                    },
                                }"
                            >
                                Ver
                            </router-link>
                        </button>
                        <button class="btn btn-primary" type="button">
                            <router-link
                                class="bi bi-pencil-fill"
                                tabindex="-1"
                                :to="{
                                    name: 'modificar-restaurante',
                                    params: { id: restaurante.id },
                                }"
                            >
                                Modificar
                            </router-link>
                        </button>
                        <button
                            class="btn btn-primary"
                            type="button"
                            v-if="idEliminar != restaurante.id"
                            @click="eliminarRestaurante(restaurante.id)"
                        >
                            <i class="bi bi-trash-fill"></i> Eliminar
                        </button>
                        <div class="container-fluid" v-else>
                            <!--Si se le ha dado click a "Eliminar", el botón desaparece"-->
                            <p>¿Estás seguro de que quieres borrarlo?</p>
                            <div class="btn-group gap-2 mb-4">
                                <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="siBorrar(restaurante.id)"
                                >
                                    Sí
                                </button>
                                <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="noBorrar()"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spinner-border" role="status" v-else-if="hay">
                <span class="visually-hidden">Cargando restaurantes...</span>
            </div>
            <p v-else-if="!hay & (!errorS & !errorDB)">No hay restaurantes</p>
            <p class="error" v-else-if="errorS">
                No se ha podido conectar con el servidor. Inténtelo de nuevo más
                tarde
            </p>
            <p class="error" v-else-if="errorDB">
                No se ha podido conectar con la base de datos
            </p>
            <button
                class="btn btn-up fixed-bottom ms-auto me-5"
                type="button"
                v-show="scrollpx > 300"
                @click="irArriba()"
            >
                <a class="bi bi-arrow-up-circle-fill"></a>
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
/*Lista de restaurantes*/
.caja {
    border: var(--main-border);
    border-radius: 20px;
    background-color: var(--bs-light);
}

/*ID de arriba a la izquierda*/
.id {
    margin-top: -10px;
}
</style>