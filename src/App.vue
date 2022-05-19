<template>
    <div id="app">
        <img src="../dist/logo.png" />
        <h1>{{ msg }}</h1>
        <!--Menú de arriba-->
        <ul class="top">
            <li><router-link to="/">Home</router-link></li>
            <li>
                <router-link to="/get-restaurantes">Restaurantes</router-link>
            </li>
            <li>
                <router-link
                    :to="{ name: 'restaurante-destacado', params: { id: 0 } }"
                    >Restaurante destacado</router-link
                >
            </li>
            <li>
                <router-link
                    :to="{ name: 'restaurante-random', params: { id: 0 } }"
                    >¿Dónde comer?</router-link
                >
            </li>
            <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>

        <!--Router-->
        <router-view></router-view>
    </div>
</template>

<script>
//TODO Probar a meter más de una imagen (habría que hacer otra BD)
//TODO Probar a meter imagen desde Desktop con BLOB
//FIXME No funciona en git
//FIXME A veces no refresca la web con los nuevos cambios
//TODO convertir todos los mensajes de error en variables globales. Si una imagen no carga en el alt poner que ha habido un error
import Vue from "vue";

Vue.component("errorNomDir", {
    template: `
    <tr>
        <td></td>
        <td class="tdError">
            <input class="error" value="Este restaurante ya existe" disabled></input>
        </td>
    </tr>
`,
});

export default {
    name: "app",
    data() {
        return {
            msg: "Restaurantes",
        };
    },
};
</script>

<style>
/*App*/
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
}

/*Barra menú*/
.top {
    list-style-type: none;
    margin: auto;
    overflow: hidden;
    background-color: #42b983;
    border: 1px solid #2c3e50;
}

.top a {
    display: block;
    color: #2c3e50;
    text-align: center;
    padding: 10px;
    text-decoration: none;
}

.top a:hover {
    background-color: #2c3e50;
    color: white;
}

.top li {
    display: inline-block;
}

/*AltaRestaurante + ModificarRestaurante*/
/*Flecha izquierda*/
.atras {
    border: none;
    background-color: inherit;
    font-size: 35px;
    float: left;
    margin-right: 10px;
}

.atras a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.atras a:hover {
    color: #42b983;
    cursor: pointer;
}

/*Columna del botón limpiar*/
.tdIconos {
    padding: 0px;
}

/*Botón limpiar*/
.limpiar {
    border: none;
    background-color: inherit;
    font-size: 30px;
    float: right;
    margin-right: 10px;
}

.limpiar a {
    text-decoration: none;
    color: #2c3e50;
    transition: all 200ms ease;
}

.limpiar a:hover {
    color: #42b983;
    cursor: pointer;
}

/*Caja formulario*/
.form {
    border: 5px solid #42b983;
    margin: auto;
    margin-top: -10px;
    width: 40%;
}

/*Formulario, filas y columnas*/
.form tr,
td {
    padding: 10px 0px 10px 0px;
}

/*Etiquetas*/
.etq {
    text-align: right;
}

/*Input de dirección*/
.dir {
    padding-bottom: 0px;
}

/*Columna del mensaje de error*/
.tdError {
    padding-top: 0px;
}

/*Input del mensaje de error*/
.error {
    color: firebrick;
    background-color: #ffcccc;
    border: none;
    border-radius: 5px;
    width: 80%;
}

/*Resto de campos*/
input[type="text"],
textarea,
select {
    border: solid #2c3e50 1px;
    border-radius: 25px;
    padding: 5px;
    width: 80%;
    background-color: white;
    max-width: 730px;
    max-height: 130px;
}

/*Textarea de descripción*/
textarea {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 13px;
    border-radius: 20px;
}

/*input[type="file"] {
    padding: 5px;
    width: 50%;
    margin: 0px 20px;
}

input[type="file"]::file-selector-button {
    background: #42b983;
    border: 1px solid #2c3e50;
    padding: 5px;
    color: #2c3e50;
}

input[type="file"]::file-selector-button:hover {
    background-color: #2c3e50;
    color: #42b983;
    cursor: pointer;
}

input[type="text"]:disabled,
input[type="file"]:disabled {
    background-color: silver;
}*/

/*Botón guardar*/
input[type="submit"] {
    background: #42b983;
    border: 1px solid #2c3e50;
    margin: 10px;
    padding: 10px;
    color: #2c3e50;
    font-size: 15px;
    font-weight: bold;
}

input[type="submit"]:hover {
    background-color: #2c3e50;
    color: #42b983;
    cursor: pointer;
}

/*VerRestaurante + RestauranteDestacado + RestauranteRandom*/
/*Flecha derecha*/
.right {
    width: 20px;
    height: 20px;
    border-top: 5px solid #2c3e50;
    border-right: 5px solid #2c3e50;
    margin: 1% 30%;
    right: 0;
    left: 100;
    transform: translate3d(0, -50%, 0) rotate(45deg);
}

.right:hover {
    border-color: #2c3e50;
    box-shadow: 5px -5px 0 #42b983;
}

/*Nombre restaurante*/
.nomRest {
    border: solid #2c3e50 1px;
    border-radius: 25px;
    padding: 10px;
    width: 50%;
    margin: auto;
}

/*Estrellas puntuación*/
.checked {
    color: gold;
}

/*Div grande del restaurante e imagen*/
.divRestImg {
    display: flex;
    justify-content: center;
}

/*Div del restaurante y de la imagen*/
.divRest,
.divImg {
    width: 40%;
    padding: 40px 0px;
}

/*Imagen*/
.img {
    height: 100%;
    width: 50%;
    border-radius: 15px;
    transition: transform 0.25s ease;
}

.img:hover {
    -webkit-transform: scale(2);
    transform: scale(2);
}

/*GetRestaurantes + ModificarRestaurante*/
/*Botón eliminar*/
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
