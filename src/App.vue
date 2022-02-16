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
                <router-link :to="{ name: 'restaurante-destacado' }"
                    >Restaurante destacado</router-link
                >
            </li>
            <li>
                <router-link :to="{ name: 'restaurante-random' }"
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
//BUG Cuando refrescas la página, peta
//FIXME El icono grande en github no carga
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
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 50px;
}

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

/*VerRestaurante + RestauranteDestacado + RestauranteRandom*/
.nombreRestaurante {
    border: solid #2c3e50 1px;
    border-radius: 25px;
    padding: 10px;
    width: 50%;
    margin: auto;
}

.checked {
    color: gold;
}

.restImg {
    display: flex;
    justify-content: center;
    margin: 30px;
}

.divRest,
.divImg {
    width: 40%;
    padding: 40px 0px;
}

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

/*AltaRestaurante + ModificarRestaurante*/
.arrow {
    position: absolute;
    width: 20px;
    height: 20px;
    border-top: 5px solid #2c3e50;
    border-right: 5px solid #2c3e50;
    box-shadow: 0 0 0 black;
    transition: all 200ms ease;
    right: 100%;
    margin: 0.5% 30%;
}
.left {
    left: 0;
    transform: translate3d(0, -50%, 0) rotate(-135deg);
}

.left:hover {
    border-color: #2c3e50;
    box-shadow: 5px -5px 0 #42b983;
}

.form {
    margin: auto;
    width: 40%;
    border: 5px solid #42b983;
    padding: 20px;
}

label {
    display: inline-block;
    width: 20%;
    text-align: right;
    margin: 15px;
}

input[type="text"],
textarea,
select {
    border: solid #2c3e50 1px;
    border-radius: 25px;
    padding: 5px;
    width: 50%;
    margin: 0px 20px;
    background-color: white;
}

textarea {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 13px;
    border-radius: 20px;
}

.desc * {
    vertical-align: middle;
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

.form div {
    margin: 15px 0 15px 0;
}

.limpiar {
    border: none;
    background-color: inherit;
    font-size: 35px;
    position: absolute;
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
</style>
