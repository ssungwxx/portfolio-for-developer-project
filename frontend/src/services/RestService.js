import axios from "axios";

export default {
    // Post 관련 함수
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
    getPostDetail(user, id) {
        return axios
            .get(`http://70.12.246.138:3000/posts/${user}`)
            .then(response => (this.posts = response.data[id]));
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
    countPost() {
        return axios
            .get("http://70.12.246.138:3000/posts/count")
            .then(response => (this.posts = response.data));
    },
    insertPost(data) {
        return axios
            .post("http://70.12.246.138:3000/posts", data)
            .then(response => (this.posts = response.data));
    },
    // Repository 관련 함수
    getRepositories() {
        return axios
            .get("http://70.12.246.138:3000/repositories")
            .then(response => (this.repos = response.data));
    },
    getRepository(id) {
        return axios
            .get("http://70.12.246.138:3000/repositories/" + id)
            .then(response => (this.repos = response.data));
    },
    insertRepository(data) {
        return axios
            .post("http://70.12.246.138:3000/repositories", data)
            .then(response => (this.repos = response.data));
    },
    deleteRepository(id) {
        return axios
            .delete("http://70.12.246.138:3000/repositories/" + id)
            .then(response => (this.repos = response.data));
    },
    updateRepository(id, data) {
        return axios
            .put("http://70.12.246.138:3000/repositories/" + id, data)
            .then(response => (this.repositories = response.data));
    },
    countRepositories() {
        return axios
            .get("http://70.12.246.138:3000/repositories/count")
            .then(response => (this.repos = response.data));
    },
    // User 관련 함수
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
    loginUser(data) {
        return axios
            .post("http://70.12.246.138:3000/users/login", data)
            .then(res => {
                return res.data;
            });
    },
    getSearchUsers(data) {
        return axios
            .get("http://70.12.247.68:3000/users/search" + data)
            .then(response => (this.users = response.data));
    },
    // 번역 관련 함수
    translateText(data) {
        return axios
            .post("http://70.12.247.68:3000/en", data)
            .then(response => (this.enText = response.data));
    },
    //Log관련 함수
    insertLog(path) {
        return axios.post("http://70.12.246.138:3000/logs/" + path);
    },
    getLog() {
        return axios
            .get("http://70.12.246.138:3000/logs")
            .then(response => (this.Logs = response.data));
    },

    //Post Comment관련 함수
    getAllPostComments() {
        return axios.get("http://70.12.246.138:3000/pcom");
    },
    getOnePostComments(post_no) {
        return axios.get("http://70.12.246.138:3000/pcom/" + post_no);
    },
    insertPostComment(data) {
        return axios.post("http://70.12.246.138:3000/pcom", data);
    },
    deletePostComment(pcom_no) {
        return axios.delete("http://70.12.246.138:3000/pcom/" + pcom_no);
    },
    updatePostComment(data) {
        return axios.put("http://70.12.246.138:3000/pcom", data);
    },
    //Repository comment관련 함수
    getAllRepoComments() {
        return axios.get("http://70.12.246.138:3000/rcom");
    },
    getOneRepoCommeents(repo_no) {
        return axios.get("http://70.12.246.138:3000/rcom/" + repo_no);
    },
    insertRepoComment(data) {
        return axios.post("http://70.12.246.138:3000/rom", data);
    },
    deleteRepoComment(rcom_no) {
        return axios.delete("http://70.12.246.138:3000/rcom" + rcom_no);
    },
    updateRepoComment(data) {
        return axios.put("http://70.12.246.138:3000/rcom", data);
    },
    //push notification
    pushNotification(body, title, list) {
      return axios
                .post('https://fcm.googleapis.com/fcm/send', {
                    "notification" : {
                        "body": body,
                        "title" : title,
                    },
                    "registration_ids" : list
                    }, {
                        headers : {
                            "Content-Type": 'application/json',
                            "Authorization": 'key=AAAAv_NYWa4:APA91bEv_8joSyJhsPqPh0tPA1-6-IMN01sSZ1d-N8vTHyaSOGRBpRa67GhXEDDi-yi5lOCiBpuyoUWJLcMiqQx_iWBihl66NHTtKM22kY_WpEwc8CcUyaJU4TfzwEJWZQ6pktzD8YaL'
                        }
                    }
                )
                .then(response => {
                    console.log(response)
                    resolve(response)
                })
                .catch(err => {
                    console.log(err)
                })
    },

    //insert Token(Push Notification)
    insertToken(token){
      console.log("insert token");
      return axios.post("http://70.12.246.138:3000/fcm",{
        "fcm_token" : token
      });
    },
    async getTokenlist(){
      return await axios.get("http://70.12.246.138:3000/fcm");
    }
};
