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
    getRepositories() {
        return axios
            .get("http://70.12.246.138:3000/repositories")
            .then(response => (this.portfolios = response.data));
    },
    getRepository(id) {
        return axios
            .get("http://70.12.246.138:3000/repositories/" + id)
            .then(response => (this.portfolios = response.data));
    },
    insertRepository(data) {
        return axios
            .post("http://70.12.246.138:3000/repositories", data)
            .then(response => (this.portfolios = response.data));
    },
    deleteRepository(id) {
        return axios
            .delete("http://70.12.246.138:3000/repositories/" + id)
            .then(response => (this.portfolios = response.data));
    },
    updateRepository(id, data) {
        return axios
            .put("http://70.12.246.138:3000/repositories/" + id, data)
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
    },
    translateText(data) {
        return axios
            .post("http://70.12.247.68:3000/en", data)
            .then(response => (this.enText = response.data));
    },
    getSearchUsers(data) {
        return axios
            .get("http://70.12.247.68:3000/users/search" + data)
            .then(response => (this.users = response.data));
    }
};
