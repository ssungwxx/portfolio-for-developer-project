<template>
    <div id="test">
        <p>{{ posts }}</p>
        <button @click="searchTerm">눌러보쟈</button>
    </div>
</template>


<script>
    // import Translate from "@google-cloud/translate"

    export default {
        name: "TestPage",
        data() {
            return {
                posts: [],
            }
        },
        methods: {
            searchTerm() {
                this.quickstart()

            },
            async quickstart(projectId = "ssafy-ss2") {
                const {Translate} = require('@google-cloud/translate');

                const translate = new Translate({projectId});

                const text = 'Hello, world!';

                const target = 'ko';

                const translation = await translate.translate(text, target);
                console.log(`Text: ${text}`);
                console.log(`Translation: ${translation}`);
                this.posts.push(translation)
            }
        },
        computed: {}
    }

</script>

<style>
    #test {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        max-width: 560px;
    }
</style>