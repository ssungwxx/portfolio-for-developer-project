<template>
    <div class="py-3">
        <v-layout row wrap>
            <v-flex xl12 lg12 md12 sm12 hidden-xs-only>
                <v-sheet class="v-sheet--offset mx-auto" color="grey lighten-5" elevation="12"
                         max-width="calc(100% - 32px)" height="60%">
                    <v-sparkline :labels="Object.keys(data).reverse()" :value="Object.values(data).reverse()" :smooth="radius || false"
                                 :stroke-linecap="lineCap" :gradient="gradient" color="grey"
                                 line-width="2" padding="16" auto-draw class="zoom">
                    </v-sparkline>
                </v-sheet>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import GitLab from "../services/GitLabRepoService";


export default {
    name: "UserPage",
    data() {
        return {
            data: {},
            radius: 5,
            gradient: ["#1feaea", "#ffd200", "#f72047"],
            lineCap: "round"
        }
    },
    methods: {
        async gitGraph() {
            this.data = await GitLab.getPushed(7513);
        },
    },
    mounted() {
        this.gitGraph();
    }
}
</script>
<style>

</style>