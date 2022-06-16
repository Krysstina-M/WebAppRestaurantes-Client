<template>
    <h2>Estás en la página de {{ titulo }}</h2>
</template>

<script>
export default {
    name: "contacto",
    data() {
        return {
            titulo: "contacto",
        };
    },
    mounted() {
        this.getRoute();
    },
};
</script>