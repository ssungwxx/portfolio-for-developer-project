<template>
    <v-layout mt-5 wrap>
        <v-flex v-for="i in users.length > limits ? limits : users.length">
                {{users[i-1].user_id}}
                <br>{{users[i-1].user_name}}
                <br>{{users[i-1].user_grade}}
        </v-flex>

        <div class="plus">
                <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" href="/PortfolioWrite" dark>
                    <v-icon size="25" class="mr-2">fa-edit</v-icon>Write
                </v-btn>
        </div>
    </v-layout>
</template>
<script>

import RestService from "@/services/RestService";

export default {
    name: "Delegate",
    props: {
        user_id: { type: String},
        user_name: { type: String},
        user_grade: { type: Number},
          },
    data() {
        return {
            users: []
        };
    },
    components: {

    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            this.users = await RestService.getUsers();
        }
    }
};
</script>
<style>
.plus {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.mw-700 {
    max-width: 700px;
    margin: auto;
}

.headline {
    overflow: hidden;
    line-height: 1.5;
    text-overflow: ellipsis;
    height: 1.5em;
}

.grey--text {
    overflow: hidden;
    line-height: 1.2;
    text-overflow: ellipsis;
    height: 3.6em;
}
</style>
