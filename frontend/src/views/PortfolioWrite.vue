<template>
    <v-container>
        <div>
            <p class="port-title">Write New Portfolio</p>
        </div>
        <div>
            <div class="markdown">
                <v-flex>
                    <v-text-field label="title"></v-text-field>
                </v-flex>
                <markdown-editor></markdown-editor>
            </div>
        </div>
    <v-btn>
        Submit
    </v-btn>
    </v-container>
</template>

<script>
    import FirebaseService from '@/services/FirebaseService'
    export default {
        name: "PortfolioWrite",
        data() {
            return {

            }
        },

    }
</script>

<style>
    .port-title {
        font-size: 5vw;
    }
</style>