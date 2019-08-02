<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <div class="writediv">
            <v-text-field v-model="title" :rules="titleRules" label="제목" required></v-text-field>
            <v-textarea v-model="content" :rules="contentRules" label="내용" required ></v-textarea>
        </div>
        <div class="btns">
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate" :href="postlist">쓰기</v-btn>
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
            postlist: ""
        }
    },
    mounted() {
        console.log(this.user_id)
        this.postlist = "/users/" + this.user_id + "/posts"
    },
    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                const data = {
                    user_id: this.user_id,
                    post_title: this.title,
                    post_content: this.content
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
.writediv {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btns {
    margin-top: 50px;
}
</style>