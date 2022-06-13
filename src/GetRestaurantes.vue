<template>
    <div id="div">
        <div
            class="btn-toolbar justify-content-between"
            role="toolbar"
            aria-label="Toolbar with button groups"
        >
            <div class="btn-group ms-5" role="group" aria-label="First group">
                <button class="btn btn-primary" type="button">
                    <router-link :to="{ name: 'alta-restaurante' }">
                        <i class="bi bi-plus-lg"></i> Añadir nuevo restaurante
                    </router-link>
                </button>
            </div>
            <div class="btn-group me-5" role="group" aria-label="Second group">
                <button
                    class="btn-primary me-2"
                    type="button"
                    @click="ordenarPorNombre()"
                >
                    <i
                        :class="[
                            ordenarNomAsc
                                ? 'bi bi-sort-alpha-down'
                                : 'bi bi-sort-alpha-up',
                        ]"
                    ></i>
                    Ordenar por nombre
                </button>
                <button
                    class="btn-primary ms-2"
                    type="button"
                    @click="ordenarPorCodigo()"
                >
                    <i
                        :class="[
                            ordenarCodAsc
                                ? 'bi bi-sort-numeric-down'
                                : 'bi bi-sort-numeric-up',
                        ]"
                    ></i>
                    Ordenar por código
                </button>
            </div>
        </div>

        <div class="container-fluid">
            <p class="pError" v-if="errorDB">
                No se ha podido conectar con la base de datos.
            </p>
            <p class="pError" v-else-if="errorS">
                No se ha podido conectar con el servidor. Inténtelo de nuevo más
                tarde.
            </p>
            <div
                class="row row-cols-6 justify-content-center"
                id="GetRestaurantes"
                v-else-if="restaurantes != ''"
            >
                <div
                    class="col p-4 mt-4 m-2"
                    v-for="restaurante in restaurantes"
                    :key="restaurante.id"
                >
                    <h6 class="id">{{ restaurante.id }}</h6>
                    <h5>{{ restaurante.nombre }}</h5>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button">
                            <router-link
                                :to="{
                                    name: 'ver-restaurante',
                                    params: {
                                        id: restaurante.id,
                                    },
                                }"
                            >
                                <i class="bi bi-eye-fill"></i> Ver
                            </router-link>
                        </button>
                        <button class="btn btn-primary" type="button">
                            <router-link
                                :to="{
                                    name: 'modificar-restaurante',
                                    params: { id: restaurante.id },
                                }"
                            >
                                <i class="bi bi-pencil-fill"></i> Modificar
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
            <p v-else-if="noHay">No hay restaurantes</p>
            <p v-else>Cargando restaurantes...</p>
            <button
                class="btn-secondary fixed-bottom ms-auto me-5"
                type="button"
                v-show="scrollpx > 400"
                @click="irArriba()"
            >
                <a class="bi bi-arrow-up-circle-fill"></a>
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ERRORES } from "./main";

export default {
    name: "getRestaurantes",
    data() {
        return {
            restaurantes: "",
            errorDB: 0,
            errorS: 0,
            noHay: 0,
            ordenarNomAsc: 1,
            ordenarNomDesc: 0,
            ordenarCodAsc: 0,
            ordenarCodDesc: 1,
            scrollpx: 0,
            idEliminar: "",
        };
    },
    mounted() {
        this.getRestaurantes();

        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        getRestaurantes() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes"
                )
                .then((respuesta) => {
                    if (respuesta.data.status == "OK") {
                        this.restaurantes = respuesta.data.data;

                        this.ordenarNomAsc = 1;
                        this.ordenarNomDesc = 0;
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
        ordenarPorNombre() {
            this.ordenarCodAsc = 0;
            this.ordenarCodDesc = 1;

            if (this.ordenarNomAsc) {
                axios
                    .get(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-nom-desc"
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            this.restaurantes = respuesta.data.data;

                            this.ordenarNomAsc = 0;
                            this.ordenarNomDesc = 1;
                        } else {
                            console.error(ERRORES.ERROR_DB);
                            this.errorDB = 1;
                        }
                    })
                    .catch((error) => {
                        console.error(ERRORES.ERROR_SERVER, error);
                        this.errorS = 1;
                    });
            } else if (this.ordenarNomDesc) {
                axios
                    .get(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes"
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            this.restaurantes = respuesta.data.data;

                            this.ordenarNomAsc = 1;
                            this.ordenarNomDesc = 0;
                        } else {
                            console.error(ERRORES.ERROR_DB);
                            this.errorDB = 1;
                        }
                    })
                    .catch((error) => {
                        console.error(ERRORES.ERROR_SERVER, error);
                        this.errorS = 1;
                    });
            }
        },
        ordenarPorCodigo() {
            this.ordenarNomAsc = 0;
            this.ordenarNomDesc = 1;

            if (this.ordenarCodAsc) {
                axios
                    .get(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-cod-desc"
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            this.restaurantes = respuesta.data.data;

                            this.ordenarCodAsc = 0;
                            this.ordenarCodDesc = 1;
                        } else {
                            console.error(ERRORES.ERROR_DB);
                            this.errorDB = 1;
                        }
                    })
                    .catch((error) => {
                        console.error(ERRORES.ERROR_SERVER, error);
                        this.errorS = 1;
                    });
            } else if (this.ordenarCodDesc) {
                axios
                    .get(
                        "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes-cod-asc"
                    )
                    .then((respuesta) => {
                        if (respuesta.data.status == "OK") {
                            this.restaurantes = respuesta.data.data;

                            this.ordenarCodAsc = 1;
                            this.ordenarCodDesc = 0;
                        } else {
                            console.error(ERRORES.ERROR_DB);
                            this.errorDB = 1;
                        }
                    })
                    .catch((error) => {
                        console.error(ERRORES.ERROR_SERVER, error);
                        this.errorS = 1;
                    });
            }
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
                        this.getRestaurantes();
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
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        var timerCount = 5;
                        timerCount--;

                        if (timerCount == 0) this.noHay = 1;
                    }, 1000);
                }
            },
            immediate: true, // This ensures the watcher is triggered upon creation
        },
    },
};
</script>

<style>
/*Botones añadir restaurante y ordenar*/
.btn {
    outline: none;
}

.btn-primary:not(:disabled) {
    background-color: var(--main-verde);
    color: var(--main-gris);
    border: var(--main-border);
    border-radius: 0;
}

.btn-primary > a {
    color: var(--main-gris);
    text-decoration: none;
}

.btn-primary:hover {
    background-color: var(--main-gris);
    color: var(--bs-white);
}

.btn-primary:hover > a {
    color: var(--bs-white);
}

/*Lista de restaurantes*/
.col {
    border: var(--main-border);
    border-radius: var(--main-border-radius);
    background-color: var(--bs-light);
}

/*ID de arriba a la izquierda------*/
.id {
    margin: -10px 0px 10px 0px;
    text-align: left;
}

/*Botón para ir arriba del todo*/
.btn-secondary {
    background-color: inherit;
    border: none;
    font-size: 50px;
}

.btn-secondary > a {
    color: var(--main-verde);
    text-decoration: none;
}

.btn-secondary > a:hover {
    color: var(--main-gris);
    cursor: pointer;
}
</style>