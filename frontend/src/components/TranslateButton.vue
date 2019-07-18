<template>

    <v-icon color="red" large class="translate" @click="select">g_translate</v-icon>

</template>

<script>

    export default {
        name: "TranslateButton",
        methods: {
            select () {
                const selected = document.querySelectorAll(".v-content")[1];
                
            }
        }
    }

</script>

<style>
    .translate {
        position: fixed;
        bottom: 50px;
        left: 50px;
        margin: 0;
        padding: 0;
        z-index: 5;
    }
</style>