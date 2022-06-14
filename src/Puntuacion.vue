<template>
    <p v-if="Math.round(punt) == 0">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
    </p>
    <p v-else-if="Math.round(punt) == 1">
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
    </p>
    <p v-else-if="Math.round(punt) == 2">
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
    </p>
    <p v-else-if="Math.round(punt) == 3">
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
    </p>
    <p v-else-if="Math.round(punt) == 4">
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill"></i>
    </p>
    <p v-else-if="Math.round(punt) == 5">
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
        <i class="bi bi-star-fill checked"></i>
    </p>
</template>

<script>
export default {
    name: "Puntuacion",
    props: ["punt"],
};
</script>