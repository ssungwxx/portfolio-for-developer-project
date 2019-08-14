import axios from "axios";
import AxiosService from "@/services/AxiosService";
import DBcon from "../config/DBConnection";

export default {
    // Post 관련 함수
    getPosts() {
        return axios
            .get(DBcon.URL + "/posts")
            .then(response => (this.posts = response.data));
    },
    getPost(id) {
        return axios
            .get(DBcon.URL + "/posts/user/" + id)
            .then(response => (this.posts = response.data));
    },
    getPostDetail(user, id) {
        return axios
            .get(DBcon.URL + `/posts/user/${user}`)
            .then(response => (this.posts = response.data[id]));
    },
    async updatePost(id, data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .put(DBcon.URL + "/posts/" + id, data)
            .then(response => (this.posts = response.data));
    },
    async deletePost(id, data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .delete(DBcon.URL + "/posts/" + id, data)
            .then(response => (this.posts = response.data));
    },
    countPost() {
        return axios
            .get(DBcon.URL + "/posts/count")
            .then(response => (this.posts = response.data));
    },
    async insertPost(data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .post(DBcon.URL + "/posts", data)
            .then(response => (this.posts = response.data));
    },
    // Repository 관련 함수
    getRepositories() {
        return axios
            .get(DBcon.URL + "/repositories")
            .then(response => (this.repos = response.data));
    },

    getRepository(id) {
        return axios
            .get(DBcon.URL + "/repositories/" + id)
            .then(response => (this.repos = response.data));
    },
    async insertRepository(data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .post(DBcon.URL + "/repositories", data)
            .then(response => response.data);
    },
    async deleteRepository(id, data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .delete(DBcon.URL + "/repositories/" + id, data)
            .then(response => (this.repos = response.data));
    },
    async updateRepository(id, data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .put(DBcon.URL + "/repositories/" + id, data)
            .then(response => (this.repositories = response.data));
    },
    countRepositories() {
        return axios
            .get(DBcon.URL + "/repositories/count")
            .then(response => (this.repos = response.data));
    },
    // User 관련 함수
    getUsers() {
        return axios
            .get(DBcon.URL + "/users")
            .then(response => (this.users = response.data));
    },
    getCount() {
        const counts = [];
        axios.get(DBcon.URL + "/users").then(function(response) {
            for (let i = 0; i < response.data.length; ++i) {
                const count = [];
                const user = response.data[i];
                count.push(user.user_id);
                const posts = axios
                    .get(DBcon.URL + "/posts/" + user.user_id)
                    .then(response => count.push(response.data.length));
                const repos = axios
                    .get(DBcon.URL + "/repositories/" + user.user_id)
                    .then(response => count.push(response.data.length));
                counts.push(count);
            }
        });
        return counts;
    },
    async getUser(id) {
        await AxiosService.checkAuthorization(id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .get(DBcon.URL + "/users/" + id)
            .then(response => (this.check = response.data[0]));
    },
    async getGitInfo(id) {
        return axios
            .get(DBcon.URL + "/users/gitAdd/" + id)
            .then(response => (this.gitInfo = response.data[0]));
    },
    insertUser(data) {
        return axios
            .post(DBcon.URL + "/users", data)
            .then(response => (this.err_stat = response.data));
    },
    async updateUser(id, data) {
        await AxiosService.checkAuthorization(id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .put(DBcon.URL + "/users", data)
            .then(response => (this.user = response.data));
    },
    async deleteUser(id) {
        await AxiosService.checkAuthorization(id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .delete(DBcon.URL + "/users/" + id)
            .then(response => (this.user = response.data));
    },
    loginUser(data) {
        return axios.post(DBcon.URL + "/users/login", data).then(res => {
            return res.data;
        });
    },
    getSearchUsers(data) {
        return axios
            .get(DBcon.URL + "/users/search" + data)
            .then(response => (this.users = response.data));
    },
    // 번역 관련 함수
    translateText(data) {
        return axios
            .post(DBcon.URL + "/en", data)
            .then(response => (this.enText = response.data));
    },
    //Log관련 함수
    insertLog(path, data) {
        return axios.post(DBcon.URL + "/logs/" + path, data);
    },
    getLog() {
        return axios
            .get(DBcon.URL + "/logs")
            .then(response => (this.Logs = response.data));
    },

    //Post Comment관련 함수
    getAllPostComments() {
        return axios.get(DBcon.URL + "/pcom");
    },
    getOnePostComments(post_no) {
        return axios.get(DBcon.URL + "/pcom/" + post_no);
    },
    async insertPostComment(data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios.post(DBcon.URL + "/pcom", data).then(res => res);
    },
    async deletePostComment(pcom_no, id) {
        await AxiosService.checkAuthorization(id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios.delete(DBcon.URL + "/pcom/" + pcom_no);
    },
    async updatePostComment(id, data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios.put(DBcon.URL + "/pcom/" + id, data);
    },
    //Repository comment관련 함수
    getAllRepoComments() {
        return axios.get(DBcon.URL + "/rcom");
    },
    getOneRepoCommeents(repo_no) {
        return axios.get(DBcon.URL + "/rcom/" + repo_no);
    },
    async insertRepoComment(data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios.post(DBcon.URL + "/rom", data);
    },
    async deleteRepoComment(rcom_no, id) {
        await AxiosService.checkAuthorization(id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios.delete(DBcon.URL + "/rcom" + rcom_no);
    },
    async updateRepoComment(data) {
        await AxiosService.checkAuthorization(data.user_id);
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios.put(DBcon.URL + "/rcom", data);
    },
    //push notification
    /*
    pushNotification(body, title, list) {
        return axios
            .post(
                "https://fcm.googleapis.com/fcm/send",
                {
                    notification: {
                        body: body,
                        title: title
                    },
                    registration_ids: list
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: DBcon.fcm_auth_token
                    }
                }
            )
            .then(response => {
                //resolve(response);
                response;
            })
            .catch(err => {
                console.log(err);
            });
    },
    */
    /*
    //insert Token(Push Notification)
    insertToken(token) {
        return axios.post(DBcon.URL + "/fcm", {
            fcm_token: token
        });
    },
    */
    /*
    async getTokenlist() {
        return await axios.get(DBcon.URL + "/fcm");
    },
    */
    // JWT Token 관리
    async getRefreshToken(user_id) {
        return await axios
            .get(DBcon.URL + "/jwt/" + user_id)
            .then(res => res.data);
    },
    async getNewAccessToken(user_id) {
        return await axios
            .post(DBcon.URL + "/jwt/" + user_id)
            .then(res => res.data);
    },
    async deleteRefreshToken(user_id) {
        return await axios
            .put(DBcon.URL + "/jwt/" + user_id)
            .then(res => res.data);
    },
    async checkAccessToken(user_id, data) {
        return await axios
            .post(DBcon.URL + "/jwt/check/" + user_id, data)
            .then(res => res.data);
    },
    async getUserIdByJWT() {
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return await axios
            .get(DBcon.URL + "/jwt/user/id")
            .then(res => res.data);
    },
    async getUserGradeByJWT() {
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return await axios
            .get(DBcon.URL + "/jwt/user/grade")
            .then(res => res.data);
    }
};
