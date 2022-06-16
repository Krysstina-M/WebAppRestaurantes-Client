<template>
    <h2>Estás en la página {{ texto }}</h2>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            texto: "home",
        };
    },
};
</script>