<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="title" :counter="10" :rules="titleRules" label="제목" required></v-text-field>
        <v-text-field v-model="content" :rules="contentRules" label="내용" required></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">쓰기</v-btn>
        <v-btn color="error" class="mr-4" @click="reset">초기화</v-btn>
    </v-form>
</template>

<script>
import RestService from "@/services/RestService"

export default {
    name: "WritePost",
    props: {
        user_id: {type: String}
    },
    data() {
        return {
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
                    user_id: this.user_id,
                    post_title: this.title,
                    post_content: this.content,
                    post_date: new Date(),
                    post_cnt: 0,
                };
                this.postpost(data);
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        async postpost(data) {
            await RestService.insertPost(data);
        }
    },
}
</script>

<style>

</style>