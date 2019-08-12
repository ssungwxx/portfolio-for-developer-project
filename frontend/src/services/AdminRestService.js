import axios from "axios";
import DBcon from "../config/DBConnection";

export default {
    // Users
    async getUsers() {
        return await axios
            .get(DBcon.adminURL + "/users")
            .then(response => response.data);
    },
    async getOneUser(user_id) {
        return await axios
            .get(DBcon.adminURL + "/users/" + user_id)
            .then(res => res.data);
    },
    async insertUser(data) {
        return await axios
            .post(DBcon.adminURL + "/users", data)
            .then(res => res.data);
    },
    async updateUser(user_id, data) {
        return await axios
            .put(DBcon.adminURL + "/users" + user_id, data)
            .then(res => res.data);
    },
    async deleteUser(user_id) {
        return await axios
            .delete(DBcon.adminURL + "/users" + user_id)
            .then(res => res.data);
    },
    // Repositories
    async getRepositories() {
        return await axios
            .get(DBcon.adminURL + "/repositories")
            .then(res => res.data);
    },
    async getOnesRepository(user_id) {
        return await axios
            .get(DBcon.adminURL + "/repositories/user/" + user_id)
            .then(res => res.data);
    },
    async getRepository(repo_no) {
        return await axios
            .get(DBcon.adminURL + "/repositories/" + repo_no)
            .then(res => res.data);
    },
    async insertRepository(data) {
        return await axios
            .post(DBcon.adminURL + "/repositories", data)
            .then(res => res.data);
    },
    async updateRepository(repo_no, data) {
        return await axios
            .put(DBcon.adminURL + "/repositories/" + repo_no, data)
            .then(res => res.data);
    },
    async deleteRepository(repo_no) {
        return await axios
            .delete(DBcon.adminURL + "/repositories" + repo_no)
            .then(res => res.data);
    },
    // Posts
    async getPosts() {
        return await axios.get(DBcon.adminURL + "/posts").then(res => res.data);
    },
    async getPostCount() {
        return await axios
            .get(DBcon.adminURL + "/posts/count")
            .then(res => res.data);
    },
    async getOnesPosts(user_id) {
        return await axios
            .get(DBcon.adminURL + "/posts/user/" + user_id)
            .then(res => res.data);
    },
    async getPost(post_no) {
        return await axios
            .get(DBcon.adminURL + "/posts/" + post_no)
            .then(res => res.data);
    },
    async insertPost(data) {
        return await axios
            .post(DBcon.adminURL + "/posts", data)
            .then(res => res.data);
    },
    async updatePost(post_no, data) {
        return await axios
            .put(DBcon.adminURL + "/posts/" + post_no, data)
            .then(res => res.data);
    },
    async deletePost(post_no) {
        return await axios
            .delete(DBcon.adminURL + "/posts/" + post_no)
            .then(res => res.data);
    },
    //Repo comments
    async getAllRepoComments() {
        return await axios
            .get(DBcon.adminURL + "/repo_comment")
            .then(res => res.data);
    },
    async getReposComments(repo_no) {
        return await axios
            .get(DBcon.adminURL + "/repo_comment/" + repo_no)
            .then(res => res.data);
    },
    async insertRepoComment(data) {
        return await axios
            .post(DBcon.adminURL + "/repo_comment", data)
            .then(res => res.data);
    },
    async updateReposComment(rcom_no, data) {
        return await axios
            .put(DBcon.adminURL + "/repo_comment/" + rcom_no, data)
            .then(res => res.data);
    },
    async deleteReposComments(repo_no) {
        return await axios
            .delete(DBcon.adminURL + "/repo_comment/all/" + repo_no)
            .then(res => res.data);
    },
    async deleteRepoComment(rcom_no) {
        return await axios
            .delete(DBcon.adminURL + "/repo_comment/" + rcom_no)
            .then(res => res.data);
    },
    // post comments
    async getAllPostComments() {
        return await axios
            .get(DBcon.adminURL + "/post_comment")
            .then(res => res.data);
    },
    async getPostComments(post_no) {
        return await axios
            .get(DBcon.adminURL + "/post_comment/" + post_no)
            .then(res => res.data);
    },
    async inserPostComment(data) {
        return await axios
            .post(DBcon.adminURL + "/post_comment", data)
            .then(res => res.data);
    },
    async updatePostComment(pcom_no, data) {
        return await axios
            .put(DBcon.adminURL + "/post_comment/" + pcom_no, data)
            .then(res => res.data);
    },
    async deletePostsComments(post_no) {
        return await axios
            .delete(DBcon.adminURL + "/post_comment/all/" + post_no)
            .then(res => res.data);
    },
    async deletePostComment(pcom_no) {
        return await axios
            .delete(DBcon.adminURL + "/post_comment/" + pcom_no)
            .then(res => res.data);
    },
    // Web Logs
    async getAllWebLogs() {
        return await axios
            .get(DBcon.adminURL + "/web_log")
            .then(res => res.data);
    },
    async getWebLogsCount() {
        return await axios
            .get(DBcon.adminURL + "/web_log/count")
            .then(res => res.data);
    }
};
