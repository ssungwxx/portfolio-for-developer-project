<template>
    <div id="test">
        <p>{{ posts }}</p>
        <button @click="google">눌러보쟈</button>
    </div>
</template>


<script>

    export default {
        name: "TestPage",
        data() {
            return {
                posts: [],
            }
        },
        methods: {
            async google() {
                try {
                    const projectId = "ssafy-ss2";
                    const Translate = require('@google-cloud/translate');
                    const translate = new Translate.Translate({projectId: projectId});
                    console.log(translate);
                    const text = 'Hello, world!';
                    const target = 'ko';
                    const translation = await translate.translate(text, target);
                    console.log(`Text: ${text}`);
                    console.log(`Translation: ${translation[0]}`);
                    this.posts.push(translation);
                } catch (error) {
                    console.error(error);
                }
            },
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