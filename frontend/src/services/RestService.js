import axios from "axios";

export default {
    getPosts() {
        return axios
            .get("http://70.12.246.138:3000/posts")
            .then(response => (this.posts = response.data));
    },
    getPost(id) {
        return axios
            .get("http://70.12.246.138:3000/posts/" + id)
            .then(response => (this.posts = response.data));
    },
    updatePost(id, data) {
        return axios
            .put("http://70.12.246.138:3000/posts/" + id, data)
            .then(response => (this.posts = response.data));
    },
    deletePost(id) {
        return axios
            .delete("http://70.12.246.138:3000/posts/" + id)
            .then(response => (this.posts = response.data));
    },
    insertPost(data) {
        return axios
            .put("http://70.12.246.138:3000/posts", data)
            .then(response => (this.posts = response.data));
    },
    getPortfolios() {
        return axios
            .get("http://70.12.246.138:3000/portfolios")
            .then(response => (this.portfolios = response.data));
    },
    getPortfolio(id) {
        return axios
            .get("http://70.12.246.138:3000/portfolios/" + id)
            .then(response => (this.portfolios = response.data));
    },
    insertPortfolio(data) {
        return axios
            .post("http://70.12.246.138:3000/portfolios", data)
            .then(response => (this.portfolios = response.data));
    },
    deletePortfolio(id) {
        return axios
            .delete("http://70.12.246.138:3000/portfolios/" + id)
            .then(response => (this.portfolios = response.data));
    },
    updatePortfolio(id, data) {
        return axios
            .put("http://70.12.246.138:3000/portfolios/" + id, data)
            .then(response => (this.portfolios = response.data));
    },
    getUsers() {
        return axios
            .get("http://70.12.246.138:3000/users")
            .then(response => (this.users = response.data));
    },
    getUser(id) {
        return axios
            .get("http://70.12.246.138:3000/users/" + id)
            .then(response => (this.check = response.data));
    },
    insertUser(data) {
        return axios
            .post("http://70.12.246.138:3000/users", data)
            .then(response => (this.err_stat = response.data));
    },
    updateUser(id, data) {
        return axios
            .put("http://70.12.246.138:3000/users/" + id, data)
            .then(response => (this.user = response.data));
    },
    deleteUser(id) {
        return axios
            .delete("http://70.12.246.138:3000/users/" + id)
            .then(response => (this.portfolios = response.data));
    },
    insertLog(path) {
        return axios.post("http://70.12.246.138:3000/logs/" + path);
    },
    loginUser(data) {
        return axios
            .post("http://70.12.246.138:3000/users/login", data)
            .then(response => (this.token = response.data));
    }
};
