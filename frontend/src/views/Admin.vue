<template>
    <div>
        <div style="display: flex; justify-content: flex-end; margin-top: 30px; margin-bottom: 30px;">
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
        <v-layout v-else-if="focus === 'logs'" style="width: 80%; margin-left: auto; margin-right: auto">
            <div>
                <div class="log" v-for="log in Logs.slice(0, limit)">
                    <div>{{ log.wlog_no }} {{ log.user_id }}</div>
                    <div>{{ log.wlog_path }}</div>
                    <div>{{ log.wlog_date }}</div>
                </div>
                <div style="margin-top: 50px">
                    <v-btn @click="loadmore">더 보기</v-btn>
                </div>
            </div>
        </v-layout>
        <v-layout v-else style="width: 90%; margin-left: auto; margin-right: auto">
            <table class="delegatetable">
                <tr>
                    <th class="title">ID</th>
                    <th class="title">NICKNAME</th>
                    <th class="title">GRADE NUM</th>
                    <th class="title">VISITOR</th>
                    <th class="title">MEMBER</th>
                </tr>
                <tr v-for="(user, i) in userList" v-if="user.user_grade!==10">
                    <td class="userdata">{{user.user_id}}</td>
                    <td class="userdata">{{user.user_name}}</td>
                    <td class="userdata">{{user.user_grade}}</td>
                    <td class="userdata">
                        <select class="customselect" :id="`TestSelect${i}`" name="SelectValue"
                                @change="updateUser(i, user.user_id)" v-if="user.user_grade === 0">
                            <option value="0" selected>방문자</option>
                            <option value="5">팀원</option>
                        </select>
                    </td>
                    <td class="userdata">
                        <select class="customselect2" :id="`TestSelect${i}`" name="SelectValue"
                                @change="updateUser(i, user.user_id)" v-if="user.user_grade === 5">
                            <option value="5" selected>팀원</option>
                            <option value="0">방문자</option>
                        </select>
                    </td>
                </tr>
            </table>

        </v-layout>
    </div>
</template>


<script>
    import RestService from "@/services/RestService";
    import AdminRestService from "@/services/AdminRestService";
    import Git from "@/services/GitLabRepoService"

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
                limit: 50,
            };
        },
        methods: {
            loadmore() {
                this.limit += 20;
            },
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
                for (const log of this.Logs) {
                    log.wlog_date = Git.calendar_time(log.wlog_date);
                }
            },
            async getUsers() {
                this.userList = await AdminRestService.getUsers();
            },
            async updateUser(i, id) {
                const newGrade = document.getElementById(`TestSelect${i}`);
                const selected = newGrade.options[newGrade.selectedIndex].value;
                const data = {
                    "user_grade": selected
                };
                await AdminRestService.updateUser(id, data);
                if (selected === 5) {
                    newGrade.setAttribute("style", "color: blue")
                }
                this.getUsers();
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
    .log {
        border: 2px orange solid;
        display: inline-grid;
        width: 18%;
        margin: 10px 1% 10px 1%;
        border-radius: 15px;
        height: 120px;
        align-items: center;
        background-color: rgba(255, 150, 0, 0.2);
    }

    .log > div {
        font-family: Consolas;
        font-size: 1.2vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }


    .delegatetable {
        border: gray 1px solid;
        border-collapse: collapse;
        width: 100%;
    }

    .delegatetable > tr > th, .delegatetable > tr > td {
        border: 1px gray solid;
        padding: 2px 0px 2px 0px;
        text-align: center;
        font-size: 1.5vw;
        font-family: Consolas !important;
    }

    .customselect {
        color: green;
    }

    .customselect2 {
        color: blue;
    }

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
        margin-left: auto;
        margin-right: auto;
    }

    .countinfo > table {
        width: 100%;
        border: 1px solid #444444;
        border-collapse: collapse;
        border-radius: 1;
    }

    .countinfo > table > tr > th, .countinfo > table > tr > td {
        border: 1px solid #444444;
        padding: 5px;
        font-family: Consolas !important;
        font-size: 1.5vw;
    }

    .total {
        font-weight: bold;
        font-size: 15px;
    }
</style>
