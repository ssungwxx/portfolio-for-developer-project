<template>
    <div>
        <div class="side">
            <sidebar-menu :menu="menu" class="menubar"/>
        </div>
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
</template>


<script>
    import RestService from "@/services/RestService";

    export default {
        name: "Admin",
        beforeMount() {
            this.count();
            this.insertLog();
        },
        created() {
            this.allcnt();
        },
        components: {},
        data() {
            return {
                users: [],
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
            };
        },
        methods: {
            async insertLog() {
                this.insertLog = await RestService.insertLog("Admin");
            },
            async count() {
                this.post_cnt = await RestService.countRepositories();
                this.repo_cnt = await RestService.countPost();
            },
            async allcnt() {
                this.users = await RestService.getCount()
            },
        }
    }
</script>

<style>
    .side {
        float: left;
        height: auto;
    }

    .table{
        width:60%;
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
