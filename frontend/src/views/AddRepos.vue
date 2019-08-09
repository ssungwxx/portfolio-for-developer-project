<template>
    <v-container class="title-div">
        <div>
            <p class="port-title">Add New Repository</p>
        </div>
        <v-layout column align-center>
            <v-form ref="form" v-model="valid">
                <v-text-field v-model="gitId" :counter="100" :rules="inputRules" label="Gitlab Access Token" required></v-text-field>
                <v-text-field v-model="gitlabApi" :counter="100" :rules="inputRules" label="Gitlab Access Token" required></v-text-field>
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

    export default {
        name: "AddRepo",
        components: {
        },
        created() {
            this.getUserInfo();
        },
        data() {
            return {
                user_id: this.$route.params.id,
                valid: true,
                inputRules: [
                    v => !!v || 'This field can not be empty',
                    v => (v && v.length > 1) || 'Name must be more than 1 characters',
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
        methods: {
            async validate() {
                if (this.$refs.form.validate()) {
                    const repoData = {
                        user_id: this.user_id,
                        repo_title: this.project_name,
                        repo_id: this.project_id,
                        repo_add: this.gitlab_address
                    };
                    await RestService.insertRepository(repoData);

                    const userData = {
                        user_id: this.user_id,
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
                this.user = await RestService.getUser(this.user_id);
                if (this.user.user_gitAdd !== null) {
                    this.gitlabApi = this.user.user_gitAdd;
                }
                if (this.user.user_gitId !== null) {
                    this.gitId = this.user.user_gitId;
                }
                if (this.user.user_gitToken !== null) {
                    this.accessToken = this.user.user_gitToken;
                }
                console.log(this.user[0])
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
