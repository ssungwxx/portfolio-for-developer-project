<template>
    <div v-html="enText">

    </div>
</template>

<script>

    export default {
        name: "enPage",
        props: {
            enText : {type : String}
        },
        data () {
            return {}
        },
    }
</script>

<style>

</style>