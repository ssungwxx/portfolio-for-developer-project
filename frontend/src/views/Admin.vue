<template>
    <div>
        <div style="display: flex; justify-content: flex-end;">
            <v-btn class="adminbutton" @click="focus = 'users'">Users</v-btn>
            <v-btn class="adminbutton" @click="focus = 'logs'">Logs</v-btn>
            <v-btn class="adminbutton" @click="focus = 'delegate'">Delegate</v-btn>
        </div>
        <div v-if="focus === 'users'">
            <div class="countinfo">
                <table class="table">
                    <tr>
                        <th style="text-align: center;">User_ID</th>
                        <th style="text-align: center;">Posts</th>
                        <th style="text-align: center;">Repositories</th>
                    </tr>
                    <tr v-for="user of users">
                        <td>{{ user[0] }}</td>
                        <td>{{ user[1] }}</td>
                        <td>{{ user[2] }}</td>
                    </tr>
                    <tr class="total">
                        <td>Total</td>
                        <td>{{ post_cnt[0].cnt }}개</td>
                        <td>{{ repo_cnt[0].cnt }}개</td>
                    </tr>
                </table>
            </div>
        </div>
        <v-layout mt-5 wrap v-else-if="focus === 'logs'">
            <v-flex v-for="log in Logs" >
                {{log.wlog_no}}
                <br />
                {{log.user_id}}
                <br />
                {{log.wlog_path}}
                <br />
                {{log.wlog_date}}
            </v-flex>
        </v-layout>
        <v-layout my-5 v-else>
            <table>
                <thead>
                <tr>
                    <th class="title">ID</th><th class="title">NICKNAME</th><th class="title">GRADE NUM</th><th class="title">VISITOR</th><th class="title">MEMBER</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="(user, i) in userList" v-if="user.user_grade!==10">
                    <td class="userdata">{{user.user_id}}</td><td class="userdata">{{user.user_name}}</td>
                    <td class="userdata">{{user.user_grade}}</td>
                    <td class="userdata">
                        <select class="customselect" id="`TestSelect${i}`" name="SelectValue" @change="updateUser(i, user.user_id)">
                            <option value="0" selected v-if="user.user_grade === 0">방문자</option>
                            <option value="0" v-else>방문자</option>
                            <option value="5" selected v-if="user.user_grade === 5">팀원</option>
                            <option value="5" v-else>팀원</option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>

        </v-layout>
    </div>
</template>


<script>
    import RestService from "@/services/RestService";
    import AdminRestService from "@/services/AdminRestService";

    export default {
        name: "Admin",
        beforeMount() {
            this.count();
            this.allcnt();
            this.insertLog();
            this.getLog();
            this.getUsers();
        },
        components: {},
        data() {
            return {
                users: [],
                userList: [],
                userPosts: [],
                userRepos: [],
                menu: [
                    {
                        header: true,
                        title: 'Admin Page',
                    },
                    {
                        title: 'Log',
                        icon: 'fa fa-bar-chart',
                        child: [
                            {
                                title: 'Log',
                                href: '../WebLog',
                            }

                        ]
                    },
                    {
                        title: 'Delegate',
                        icon: 'fa fa-hand-o-right',
                        child: [
                            {
                                href: '../Delegate',
                                title: 'Delegate',
                            }
                        ]
                    }
                ],
                post_cnt: [{
                    cnt: ""
                }],
                repo_cnt: [{
                    cnt: ""
                }],
                check: false,
                focus: "users",
                Logs: [],
            };
        },
        methods: {
            admincheck() {
                if (this.getIsLogin === true && this.getId === "admin") {
                    this.check = true
                } else {
                    this.$router.push("/")
                }
            },
            async insertLog() {
                this.insertLog = await RestService.insertLog("Admin");
            },
            async count() {
                const post_cnt = await RestService.countRepositories();
                const repo_cnt = await RestService.countPost();
                this.admincheck();
                this.post_cnt = post_cnt;
                this.repo_cnt = repo_cnt;

            },
            async allcnt() {
                this.users = await RestService.getCount()
            },
            async getLog() {
                this.Logs = await RestService.getLog();
            },
            async getUsers() {
                this.userList = await AdminRestService.getUsers();
            },
            async updateUser(i, id){
                const newGrade = document.getElementById(`TestSelect${i}`);
                const data = {
                    "user_grade" : newGrade.options.value
                };
                await AdminRestService.updateUser(id, selectedValue);
            },
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
    }
</script>

<style>
    .adminbutton {
        margin-left: 0px !important;
        background-color: transparent !important;
    }

    .side {
        float: left;
        height: auto;
    }

    .table {
        width: 60%;
    }

    .post {
        width: 40%;
        text-align: center;
        margin-left: 10%;
    }

    .repo {
        width: 40%;
        text-align: center;
        margin-left: 10%;
    }

    .countinfo {
        margin-left: 10%;
        margin-right: 5%
    }

    .countinfo > table {
        width: 100%;
        border: 1px solid #444444;
    }

    .countinfo > table > tr > th {
        border: 1px solid #444444;
        padding: 10px
    }

    .countinfo > table > tr > td {
        border: 1px solid #444444;
        padding: 10px
    }


    .total {
        font-weight: bold;
        font-size: 15px;
    }

</style>
