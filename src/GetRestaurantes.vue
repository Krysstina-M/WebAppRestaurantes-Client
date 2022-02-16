<template>
    <div>
        <p>
            <button class="alta">
                <router-link :to="{ name: 'alta-restaurante' }">
                    Añadir nuevo restaurante</router-link
                >
            </button>
        </p>
        <div class="lista">
            <ul id="GetRestaurantes" v-if="restaurantes != null">
                <li
                    class="cajas"
                    v-for="restaurante in restaurantes"
                    :key="restaurante.id"
                >
                    <b>{{ restaurante.nombre }}</b>
                    <p>
                        <router-link
                            :to="{
                                name: 'ver-restaurante',
                                params: { id: restaurante.id },
                            }"
                            >Ver</router-link
                        >
                        <router-link
                            :to="{
                                name: 'modificar-restaurante',
                                params: { id: restaurante.id },
                            }"
                            >Modificar</router-link
                        >
                        <span v-if="idEliminar != restaurante.id">
                            <!--Si NO se le ha dado click a "Eliminar", NO desaparece"-->
                            <a @click="eliminarRestaurante(restaurante.id)"
                                >Eliminar</a
                            >
                        </span>
                        <span class="eliminar" v-else>
                            <!--Si se le ha dado click a "Eliminar", desaparece"-->
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
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "getRestaurantes",
    data() {
        return {
            restaurantes: null,
            idEliminar: null,
        };
    },
    mounted() {
        this.getRestaurantes();
    },
    methods: {
        getRestaurantes() {
            axios
                .get(
                    "http://localhost/Proyectos/WebAppRestaurantes-Server/restaurantes-api.php/restaurantes"
                )
                .then((respuesta) => (this.restaurantes = respuesta.data.data));
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
                    this.idEliminar = null;
                    this.getRestaurantes();
                })
                .catch((error) => console.log(error.response.data));
        },
    },
};
</script>

<style>
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

.lista ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.cajas {
    margin: 20px;
    width: 20%;
    height: 200px;
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

.eliminar button {
    background: #42b983;
    border: 1px solid #2c3e50;
    padding: 10px 15px;
    margin: 0px 10px;
    color: #2c3e50;
}

.eliminar button:hover {
    background-color: #2c3e50;
    color: #42b983;
    cursor: pointer;
}
</style>