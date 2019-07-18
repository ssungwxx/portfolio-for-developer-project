<!-- 깃랩 그래프 다른 버전용 코드 테스트중-->

<!--<template>-->
<!--    <div class="py-3">-->
<!--        <v-layout row wrap>-->
<!--            <v-flex xl3 lg3 md3 sm3 xs3>-->
<!--                <v-flex text-xs-left>-->
<!--                    <h2 class="font-weight-regular headline_truncate">{{member.name}}</h2>-->
<!--                    <p class="subheading mb-1 grey&#45;&#45;text text&#45;&#45;darken-1-->
<!--             font-weight-light">Point : {{allCommits}}</p>-->
<!--                </v-flex>-->
<!--                <v-flex text-xs-left>-->
<!--                    <v-btn :href="member.web_url" small flat icon outline>-->
<!--                        <v-icon small>fa-arrow-right</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-flex>-->
<!--                <p>{{pushMessage}}</p>-->
<!--            </v-flex>-->
<!--            &lt;!&ndash;            <v-flex xl8 lg8 md8 sm8 hidden-xs-only>&ndash;&gt;-->
<!--            &lt;!&ndash;                <v-sheet&ndash;&gt;-->
<!--            &lt;!&ndash;                        class="v-sheet&#45;&#45;offset mx-auto"&ndash;&gt;-->
<!--            &lt;!&ndash;                        color="grey lighten-5"&ndash;&gt;-->
<!--            &lt;!&ndash;                        elevation="12"&ndash;&gt;-->
<!--            &lt;!&ndash;                        max-width="calc(100% - 32px)"&ndash;&gt;-->
<!--            &lt;!&ndash;                        height="60%"&ndash;&gt;-->
<!--            &lt;!&ndash;                >&ndash;&gt;-->
<!--            &lt;!&ndash;                    <v-sparkline&ndash;&gt;-->
<!--            &lt;!&ndash;                            :labels="labels"&ndash;&gt;-->
<!--            &lt;!&ndash;                            :value="valueall"&ndash;&gt;-->
<!--            &lt;!&ndash;                            :smooth="radius || false"&ndash;&gt;-->
<!--            &lt;!&ndash;                            :stroke-linecap="lineCap"&ndash;&gt;-->
<!--            &lt;!&ndash;                            :gradient="gradient"&ndash;&gt;-->
<!--            &lt;!&ndash;                            color="grey"&ndash;&gt;-->
<!--            &lt;!&ndash;                            line-width="2"&ndash;&gt;-->
<!--            &lt;!&ndash;                            padding="16"&ndash;&gt;-->
<!--            &lt;!&ndash;                            auto-draw&ndash;&gt;-->

<!--            &lt;!&ndash;                            class="zoom"&ndash;&gt;-->
<!--            &lt;!&ndash;                    ></v-sparkline>&ndash;&gt;-->
<!--            &lt;!&ndash;                </v-sheet>&ndash;&gt;-->
<!--            &lt;!&ndash;            </v-flex>&ndash;&gt;-->
<!--                <ejs-chart id="container" :title='title' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'>-->
<!--                    <e-series-collection>-->
<!--                        <e-series :dataSource='seData' type='Line' xName='date' yName='counts' name='commits'-->
<!--                                  :marker='marker'></e-series>-->
<!--                    </e-series-collection>-->
<!--                </ejs-chart>-->
<!--        </v-layout>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import Vue from "vue";-->
<!--    import GitlabService from '@/services/GitlabService'-->
<!--    import {ChartPlugin, LineSeries, Category, DataLabel, Tooltip} from "@syncfusion/ej2-vue-charts";-->

<!--    Vue.use(ChartPlugin);-->

<!--    const gradients = [-->
<!--        ['#1feaea', '#ffd200', '#f72047']-->
<!--    ];-->

<!--    export default {-->
<!--        name: 'Repository',-->
<!--        props: {-->
<!--            member: {-->
<!--                type: Object,-->
<!--                default: function () {-->
<!--                    return {-->
<!--                        name: "로딩중",-->
<!--                        web_url: "lab.ssafy.com",-->
<!--                        todayDate: 0,-->
<!--                    }-->
<!--                }-->
<!--            },-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                numberPush: 0,-->
<!--                pushMessage: "아직 Push 하지 않았습니다.",-->
<!--                valueall: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],-->
<!--                allCommits: 0,-->
<!--                labels: [-->
<!--                    '7/8', '7/9', '7/10', '7/11', '7/12', '7/13',-->
<!--                    '7/14', '7/15', '7/16', '7/17', '7/18', '7/19',-->
<!--                ],-->
<!--                seriesData: [-->
<!--                    {date: '7/8', counts: 0}, {date: '7/9', counts: 0},-->
<!--                    {date: '7/10', counts: 0}, {date: '7/11', counts: 0},-->
<!--                    {date: '7/12', counts: 0}, {date: '7/13', counts: 0},-->
<!--                    {date: '7/14', counts: 0}, {date: '7/15', counts: 0},-->
<!--                    {date: '7/16', counts: 0}, {date: '7/17', counts: 0},-->
<!--                    {date: '7/18', counts: 0}, {date: '7/19', counts: 0}-->
<!--                ],-->
<!--                primaryXAxis: {-->
<!--                    valueType: 'Category'-->
<!--                },-->
<!--                primaryYAxis: {-->
<!--                    labelFormat: '{value}회'-->
<!--                },-->
<!--                legendSettings: {-->
<!--                    visible: true-->
<!--                },-->
<!--                marker: {-->
<!--                    dataLabel: {-->
<!--                        visible: true-->
<!--                    }-->
<!--                },-->
<!--                tooltip: {enable: true},-->
<!--                title: "Gitlab Repository Graph",-->
<!--                seData: []-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            const today = new Date();-->
<!--            this.todayDate = String(today.getDate()).padStart(2, '0');-->
<!--            this.series();-->
<!--        },-->
<!--        methods: {-->
<!--            async series() {-->
<!--                await this.setCommit();-->
<!--                for (let i = 0; this.valueall.length > i; i++) {-->
<!--                    this.seData.push({date: this.labels[i], counts: this.valueall[i]})-->
<!--                }-->
<!--                // console.log(this.seData)-->
<!--            },-->
<!--            commitToValue(oneData) {-->
<!--                const gitrepoDay = parseInt(oneData.created_at.slice(8, 10));-->
<!--                if (gitrepoDay === parseInt(this.todayDate) && oneData.action_name === "pushed to") {-->
<!--                    this.numberPush += 1;-->
<!--                    this.pushMessage = `오늘 ${this.numberPush}번 push했습니다.`-->
<!--                }-->
<!--                if (this.valueall[gitrepoDay - 8] < 100) {-->
<!--                  //1일 집계 최대 커밋수 100으로v-->
<!--                    this.valueall[gitrepoDay - 8] += 1;-->
<!--                }-->
<!--                // this.valueall = new_value;-->
<!--            },-->
<!--            commitToVuex(severalData) {-->
<!--                severalData.data.forEach(this.commitToValue);-->
<!--                // console.log("얍")-->
<!--                // for (let i = 0; this.valueall.length > i; i++) {-->
<!--                //     this.seriesData[i].counts = this.valueall[i];-->
<!--                // }-->
<!--            },-->
<!--            async setCommit() {-->
<!--                const result = await GitlabService.getCommits(this.member.id);-->
<!--                // this.allCommits = result.data.length-->
<!--                // console.log(result.data)-->
<!--                for (const rdata of result.data) {-->
<!--                    // console.log(rdata);-->
<!--                    if (rdata.action_name === "pushed to") {-->
<!--                        this.allCommits += 1;-->
<!--                    }-->
<!--                }-->
<!--                // console.log(result.data)-->
<!--                this.commitToVuex(result)-->
<!--            }-->
<!--        },-->
<!--        provide: {-->
<!--            chart: [LineSeries, Category, DataLabel, Tooltip]-->
<!--        }-->
<!--    }-->
<!--</script>-->
<!--<style>-->
<!--    .zoom {-->
<!--        /*zoom: 200%;*/-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--    }-->

<!--    .headline_truncate {-->
<!--        display: -webkit-box;-->
<!--        -webkit-line-clamp: 1;-->
<!--        -webkit-box-orient: vertical;-->
<!--        overflow: hidden;-->
<!--    }-->

<!--    /* 스켈레톤 코드에서 깃 레포지토리 개행 관련 코드*/-->
<!--    .content_truncate {-->
<!--        display: -webkit-box;-->
<!--        -webkit-line-clamp: 4;-->
<!--        -webkit-box-orient: vertical;-->
<!--        overflow: hidden;-->
<!--    }-->
<!--</style>-->

<template>
    <div class="py-3">
        <v-layout row wrap>
            <v-flex xl12 lg12 md12 sm12 xs12 style="display: flex; justify-content: space-around">
                <div style="display: flex; align-items: center">
                    <div>
                        <h2 class="font-weight-regular headline_truncate">{{member.name}}</h2>
                        <p
                            class="subheading text--darken-1 font-weight-light"
                        >Point : {{allCommits}}</p>
                    </div>
                    <v-btn
                        :href="member.web_url"
                        small
                        flat
                        icon
                        outline
                        style="margin-left: 10px;"
                    >
                        <v-icon small class="material-icons">vpn_key</v-icon>
                    </v-btn>
                </div>
                <div style="display: flex">
                    <p>{{pushMessage}}</p>
                </div>
            </v-flex>
            <v-flex xl12 lg12 md12 sm12 hidden-xs-only>
                <v-sheet
                    class="v-sheet--offset mx-auto"
                    color="grey lighten-5"
                    elevation="12"
                    max-width="calc(100% - 32px)"
                    height="60%"
                >
                    <v-sparkline
                        :labels="labels"
                        :value="valueall"
                        :smooth="radius || false"
                        :stroke-linecap="lineCap"
                        :gradient="gradient"
                        color="grey"
                        line-width="2"
                        padding="16"
                        auto-draw
                        class="zoom"
                    ></v-sparkline>
                </v-sheet>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import GitlabService from "@/services/GitlabService";

const gradients = [["#1feaea", "#ffd200", "#f72047"]];

export default {
    name: "Repository",
    props: {
        member: {
            type: Object,
            default: function() {
                return {
                    name: "로딩중",
                    web_url: "lab.ssafy.com",
                    todayDate: 0
                };
            }
        }
    },
    data() {
        return {
            numberPush: 0,
            pushMessage: "아직 Push 하지 않았습니다.",
            stats: {},
            labels: [
                "7/8",
                "7/9",
                "7/10",
                "7/11",
                "7/12",
                "7/13",
                "7/14",
                "7/15",
                "7/16",
                "7/17",
                "7/18",
                "7/19"
            ],
            valueall: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            allCommits: 0,
            radius: 5,
            gradient: gradients[0],
            lineCap: "round"
        };
    },
    mounted() {
        const today = new Date();
        this.todayDate = String(today.getDate()).padStart(2, "0");
        this.setCommit();
    },
    methods: {
        commitToValue(oneData) {
            // let authorId = oneData.author_id
            const new_value = this.valueall.slice();
            const gitrepoDay = parseInt(oneData.created_at.slice(8, 10));
            if (
                gitrepoDay === parseInt(this.todayDate) &&
                oneData.action_name === "pushed to"
            ) {
                this.numberPush += 1;
                this.pushMessage = `오늘 ${this.numberPush}번 push했습니다.`;
            }
            if (new_value[gitrepoDay - 8] < 30) {
                new_value[gitrepoDay - 8] += 1;
            }
            this.valueall = new_value;
            // console.log(this.valueall)
        },
        commitToVuex(severalData) {
            severalData.data.forEach(this.commitToValue);
        },
        async setCommit() {
            const result = await GitlabService.getCommits(this.member.id);
            // this.allCommits = result.data.length
            // console.log(result.data)
            for (const rdata of result.data) {
                // console.log(rdata);
                if (rdata.action_name === "pushed to") {
                    this.allCommits += 1;
                }
            }
            // console.log(result.data)
            this.commitToVuex(result);
        }
    },
    watch: {
        valueall: function(new_val) {
            // console.log("hihi")
        }
    }
};
</script>
<style>
.zoom {
    /*zoom: 200%;*/
    width: 100%;
    height: 100%;
}

.headline_truncate {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.content_truncate {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

p {
    height: auto;
    line-height: 1.2;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    align-self: center;
}
</style>
