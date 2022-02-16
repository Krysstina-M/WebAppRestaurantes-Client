//Importación de los ficheros .vue que se usan
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import GetRestaurantes from './GetRestaurantes.vue'
import RestauranteDestacado from './RestauranteDestacado.vue'
import RestauranteRandom from './RestauranteRandom.vue'
import Contacto from './Contacto.vue'
import VerRestaurante from './VerRestaurante.vue'
import AltaRestaurante from './AltaRestaurante.vue'
import ModificarRestaurante from './ModificarRestaurante.vue'

//Router
Vue.use(VueRouter);

//URLs para acceder a cada sección
const routes = [
    { path: '/', component: Home },
    { path: '/get-restaurantes', component: GetRestaurantes },
    { path: '/restaurante-destacado/:id', name: 'restaurante-destacado', component: RestauranteDestacado },
    { path: '/restaurante-random/:id', name: 'restaurante-random', component: RestauranteRandom },
    { path: '/contacto', component: Contacto },
    { path: '/ver-restaurante/:id', name: 'ver-restaurante', component: VerRestaurante },
    { path: '/alta-restaurante', name: 'alta-restaurante', component: AltaRestaurante },
    { path: '/modificar-restaurante/:id', name: 'modificar-restaurante', component: ModificarRestaurante }
];

//Biblioteca para que funcionen las URLs
const router = new VueRouter({
    routes,
    mode: 'history' //Si se pusiese 'hash' las URLs tendrían un # por delante
});

//Instancia Vue
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})