<template>
    <v-form ref="form" v-model="valid" lazy-validation class="writetop">
        <div class="writediv">
            <v-text-field  class="write-post" v-model="title" :rules="titleRules" label="제목" required></v-text-field>
            <v-textarea class="write-post" v-model="content" :rules="contentRules" label="내용" required ></v-textarea>
        </div>
        <div class="btns">
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
            ],
            content: "",
            contentRules: [
                v => !!v || 'Content is required',
            ],
            postlist: ""
        }
    },
    created() {
        this.postlist = `/users/${this.user_id}/posts`;
    },
    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                const data = {
                    user_id: this.user_id,
                    post_title: this.title,
                    post_content: this.content,
                };
                this.postpost(data);
                this.pushNotification();
                this.$router.push("Posts");
            }
        },
        async reset () {
            this.$refs.form.reset();
        },
        async postpost(data) {
            await RestService.insertPost(data);
        },
        async pushNotification(){
          console.log("push")
          var list = await this.getTokenlist();
          let test =[];
            for (var i = 0; i < list.data.length; i++) {
              test[i] = list.data[i].fcm_token
            }
          var body = '게시물이 등록되었습니다.'
          var title = 'PostPage'
          const temp = RestService.pushNotification({body:body},title,test);
        },
        getTokenlist(){
          return RestService.getTokenlist();
        }
    },
}
</script>

<style>
.v-text-field__slot > textarea {
    height: 500px;
}

.writetop {
    margin-top: 60px;
}

.writediv {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.write-post {
    width: 70%;
}

.btns {
    margin-top: 50px;
}
</style>
