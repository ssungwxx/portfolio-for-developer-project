<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <div>
            <v-text-field v-model="title" :counter="10" :rules="titleRules" label="제목" required></v-text-field>
            <v-text-field v-model="content" :rules="contentRules" label="내용" required></v-text-field>
        </div>
        <div>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">쓰기</v-btn>
            <v-btn color="error" class="mr-4" @click="reset">내용 초기화</v-btn>
        </div>
    </v-form>
</template>

<script>
import RestService from "@/services/RestService"

export default {
    name: "WritePost",
    data() {
        return {
            user_id: this.$route.params.id,
            valid: true,
            title: "",
            titleRules: [
                v => !!v || 'Title is required',
                // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            content: "",
            contentRules: [
                v => !!v || 'Content is required',
                // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
        }
    },
    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                const data = {

                };
                this.postpost(data);
            }
        },
        reset () {
            this.$refs.form.reset();
        },
        async postpost(data) {
            await RestService.insertPost(data);
        },
    },
}
</script>

<style>

</style>