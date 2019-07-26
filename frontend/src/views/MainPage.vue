<template>
    <v-layout>
        <div class="des">
            <h1>설명</h1>
            <v-btn @click="change">눌러</v-btn>
        </div>
    </v-layout>
</template>

<script>

export default {
    name: "mainpage",
    data() {
        return {
            dt: {"user_gitToken": "e_CnCxsi3fLRjDisDMmx"}
        }
    },
    methods: {
        change() {
            axios.put("http://70.12.246.138:3000/users/ssafy", this.dt)
                .then(res => console.log(res))
        }
    }

}
</script>

<style>
.des {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
}
</style>