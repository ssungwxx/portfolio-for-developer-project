<template>
    <v-container v-if="getIsLogin && this.$route.params.id == getId" class="title-div">
        <div>
            <p class="port-title">Add New Repository</p>
        </div>
        <v-layout column align-center>
            <v-form ref="form" v-model="valid" style="width: 50%">
                <v-text-field v-model="gitId" :counter="100" :rules="inputRules" label="Gitlab ID" required></v-text-field>
                <v-text-field v-model="gitlabApi" :counter="100" :rules="inputRules" label="Gitlab API Address" required></v-text-field>
                <v-text-field v-model="accessToken" :counter="100" :rules="inputRules" label="Gitlab Access Token" required></v-text-field>
                <v-text-field disable v-model="gitlabAddress" :counter="100" :rules="inputRules" label="Gitlab Repository Address" required></v-text-field>
                <v-text-field v-model="projectId" :counter="100" :rules="inputRules" label="Project ID" required></v-text-field>
                <v-text-field v-model="projectName" :counter="100" :rules="inputRules" label="Project Name" required></v-text-field>

                <v-checkbox v-model="checkbox" :rules="checkboxRules" label="Do you agree?" off-icon="check_circle_outline" on-icon="check_circle" required></v-checkbox>
                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Repository 추가</v-btn>
                <v-btn color="error" class="mr-4" @click="reset">내용 초기화</v-btn>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import RestService from "@/services/RestService";
import FirebaseService from "@/services/FirebaseService";
import Git from "@/services/GitLabRepoService";
import {mapActions} from "vuex";

    export default {
        name: "AddRepo",
        components: {
        },
        data() {
            return {
                user_id: this.$route.params.id,
                valid: true,
                inputRules: [
                    v => !!v || 'This field can not be empty',
                    v => (v && v.length > 1) || 'Must be more than 1 characters',
                ],
                checkboxRules: [
                    v => !!v || 'You must agree to continue!'
                ],
                gitId: "",
                gitlabApi: "",
                accessToken: '',
                gitlabAddress: '',
                projectId: '',
                projectName: "",
                user: [],
                checkbox: false,
                already: false,
            }
        },
        async created() {
            await this.setLoginInfo();
            this.userCheck();
            this.getUserInfo();
        },
        computed: {
            getIsLogin: function () {
                return this.$store.getters.getIsLogin;
            },
            getId: function () {
                return this.$store.getters.getId;
            },
            getGrade: function () {
                return this.$store.getters.getGrade;
            }
        },
        methods: {
          ...mapActions(['setLogin']),
          async setLoginInfo() {
            await this.setLogin();
          },
          userCheck() {
                if (!this.getIsLogin || this.$route.params.id != this.getId) {
                  alert('권한이 없습니다.')
                    this.$router.push("/");
                }
          },
            async validate() {
                if (this.$refs.form.validate()) {
                    const res = await Git.getDate(this.gitlabApi, this.projectId, this.accessToken);

                    const repoData = {
                        user_id: this.user_id,
                        repo_title: this.projectName,
                        repo_id: this.projectId,
                        repo_add: this.gitlabAddress,
                        repo_createdDate: res.repo_createdDate,
                        repo_recentDate: res.repo_recentDate
                    };
                    await RestService.insertRepository(repoData);
                    this.$router.push("./repos");

                    const userData = {
                        user_id: this.user_id,
                        user_pw : '-1',
                        user_gitId: this.gitId,
                        user_gitAdd: this.gitlabApi,
                        user_gitToken: this.accessToken,
                    };
                    await RestService.updateUser(this.user_id, userData)
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            async getUserInfo() {
                this.user = await RestService.getGitInfo(this.user_id);
                if (this.user.user_gitAdd !== null) {
                    this.gitlabApi = this.user.user_gitAdd;
                }
                if (this.user.user_gitId !== null) {
                    this.gitId = this.user.user_gitId;
                }
                if (this.user.user_gitToken !== null) {
                    this.accessToken = this.user.user_gitToken;
                }
            }
        },
    }

</script>
<style>
    .port-title {
        font-size: 5vw;
    }

    .title-div {
        margin-top: 50px;
    }
</style>
