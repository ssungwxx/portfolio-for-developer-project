<template>
    <div style="width: 95%; margin: auto">
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
                <div style="margin-top: 30px; margin-bottom: 30px;">
                    <v-btn @click="loadmore">더 보기</v-btn>
                </div>
            </div>
        </v-layout>
        <v-layout v-else style="width: 90%; margin-left: auto; margin-right: auto">
            <table class="delegatetable">
                <tr>
                    <th>ID</th>
                    <th>NICKNAME</th>
                    <th>GRADE NUM</th>
                    <th>VISITOR</th>
                    <th>MEMBER</th>
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
                if (this.getIsLogin && this.getGrade == 10) {
                    this.check = true;
                } else {
                    this.$router.push("/");
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
                this.Logs = await AdminRestService.getAllWebLogs();
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
    .table {
        border-radius: 15px;
        overflow: hidden;
        border-collapse: collapse;
        width: 90%;
        margin: auto;
    }

    .table > tr > th {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
        padding: 3px;
    }

    .table > tr > td {
        line-height: 36px;
        border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
        padding: 3px;
    }

    .delegatetable {
        border-radius: 15px;
        overflow: hidden;
        border-collapse: collapse;
        width: 90%;
        margin: auto;
    }

    .delegatetable > tr > th {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
        padding: 3px;
    }

    .delegatetable > tr > td {
        line-height: 36px;
        border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
        padding: 3px;
    }


    .log {
        border: 2px orange solid;
        display: inline-grid;
        width: 23%;
        margin: 10px 1% 10px 1%;
        border-radius: 15px;
        height: 120px;
        align-items: center;
        background-color: rgba(255, 150, 0, 0.1);
    }

    .log > div {
        font-family: Consolas;
        font-size: 1.2vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 5px;
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
        border-radius: 15px;
        font-size: 18px;
    }

    .total {
        font-weight: bold;
        font-size: 15px;
    }
</style>
