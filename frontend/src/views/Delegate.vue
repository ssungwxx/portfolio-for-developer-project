<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <Header></Header>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
import RestService from "@/services/RestService";

export default {
    name: "Delegate",
    beforeMount() {
        this.insertLog();
    },
    components: {
    },
    data() {
        return {
            home: "/"
        };
    },
    methods: {
        async insertLog() {
            this.insertLog = await RestService.insertLog("Delegate");
        }
    }
}
</script>
