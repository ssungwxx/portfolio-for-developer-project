import Api from "../services/Api";

const BASE_URL = "https://lab.ssafy.com/api/v4";
const GIT_REPO_ID = "6048";

export default {
    getRepomemebers() {
        return Api(BASE_URL).get(`/projects/${GIT_REPO_ID}/members`);
    },

    async getCommits(id_user) {
        let d = new Date();
        d.setMonth(d.getMonth() - 1);
        // return Api(BASE_URL).get(`/projects/${fullName}/repository/commits?since=${d.toISOString()}`)
        const first = await Api(BASE_URL).get(
            `/users/${id_user}/events?after=2019-07-07&before=2019-07-14&per_page=100`
        );
        const second = await Api(BASE_URL).get(
            `/users/${id_user}/events?after=2019-07-14&before=2019-07-20&per_page=100`
        );
        const resultArray = [first, second]
        return resultArray

    }
};
