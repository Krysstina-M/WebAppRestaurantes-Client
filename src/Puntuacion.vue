<template>
    <p v-if="Math.round(punt) == 0">
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
    </p>
    <p v-else-if="Math.round(punt) == 1">
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
    </p>
    <p v-else-if="Math.round(punt) == 2">
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
    </p>
    <p v-else-if="Math.round(punt) == 3">
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star"></span>
        <span class="fa-solid fa-star"></span>
    </p>
    <p v-else-if="Math.round(punt) == 4">
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star"></span>
    </p>
    <p v-else-if="Math.round(punt) == 5">
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
        <span class="fa-solid fa-star checked"></span>
    </p>
</template>

<script>
export default {
    name: "Puntuacion",
    props: ["punt"],
};
</script>