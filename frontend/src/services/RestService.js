import axios from "axios";
import AxiosService from "@/services/AxiosService";

export default {
    // Post 관련 함수
    getPosts() {
        return axios
            .get("http://70.12.246.138:3000/posts")
            .then(response => (this.posts = response.data));
    },
    getPost(id) {
        return axios
            .get("http://70.12.246.138:3000/posts/user/" + id)
            .then(response => (this.posts = response.data));
    },
    getPostDetail(user, id) {
        return axios
            .get(`http://70.12.246.138:3000/posts/user/${user}`)
            .then(response => (this.posts = response.data[id]));
    },
    updatePost(id, data) {
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .put("http://70.12.246.138:3000/posts/" + id, data)
            .then(response => (this.posts = response.data));
    },
    async deletePost(id, data) {
        await AxiosService.checkAuthorization();
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .delete("http://70.12.246.138:3000/posts/" + id, data)
            .then(response => (this.posts = response.data));
    },
    countPost() {
        return axios
            .get("http://70.12.246.138:3000/posts/count")
            .then(response => (this.posts = response.data));
    },
    async insertPost(data) {
        await AxiosService.checkAuthorization();
        axios.defaults.headers.jwt = sessionStorage.jwt;
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
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .post("http://70.12.246.138:3000/repositories", data)
            .then(response => console.log(response.data));
    },
    deleteRepository(id) {
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .delete("http://70.12.246.138:3000/repositories/" + id)
            .then(response => (this.repos = response.data));
    },
    updateRepository(id, data) {
        axios.defaults.headers.jwt = sessionStorage.jwt;
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
    getCount() {
        const counts = [];
        axios.get("http://70.12.246.138:3000/users").then(function(response) {
            for (let i = 0; i < response.data.length; ++i) {
                const count = [];
                const user = response.data[i];
                count.push(user.user_id);
                const posts = axios
                    .get("http://70.12.246.138:3000/posts/" + user.user_id)
                    .then(response => count.push(response.data.length));
                const repos = axios
                    .get(
                        "http://70.12.246.138:3000/repositories/" + user.user_id
                    )
                    .then(response => count.push(response.data.length));
                counts.push(count);
            }
        });
        return counts;
    },
    getUser(id) {
        return axios
            .get("http://70.12.246.138:3000/users/" + id)
            .then(response => (this.check = response.data[0]));
    },
    insertUser(data) {
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .post("http://70.12.246.138:3000/users", data)
            .then(response => (this.err_stat = response.data));
    },
    updateUser(id, data) {
        axios.defaults.headers.jwt = sessionStorage.jwt;
        return axios
            .put("http://70.12.246.138:3000/users", data)
            .then(response => (this.user = response.data));
    },
    deleteUser(id) {
        axios.defaults.headers.jwt = sessionStorage.jwt;
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
    insertLog(path, data) {
        return axios.post("http://70.12.246.138:3000/logs/" + path, data);
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
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return axios
      .post("http://70.12.246.138:3000/pcom", data)
      .then(res => console.log(res));
  },
  deletePostComment(pcom_no) {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return axios.delete("http://70.12.246.138:3000/pcom/" + pcom_no);
  },
  updatePostComment(id, data) {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return axios.put("http://70.12.246.138:3000/pcom/" + id, data);
  },
  //Repository comment관련 함수
  getAllRepoComments() {
    return axios.get("http://70.12.246.138:3000/rcom");
  },
  getOneRepoCommeents(repo_no) {
    return axios.get("http://70.12.246.138:3000/rcom/" + repo_no);
  },
  insertRepoComment(data) {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return axios.post("http://70.12.246.138:3000/rom", data);
  },
  deleteRepoComment(rcom_no) {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return axios.delete("http://70.12.246.138:3000/rcom" + rcom_no);
  },
  updateRepoComment(data) {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return axios.put("http://70.12.246.138:3000/rcom", data);
  },
  //push notification
  pushNotification(body, title, list) {
    return axios
      .post(
        "https://fcm.googleapis.com/fcm/send", {
          notification: {
            body: body,
            title: title
          },
          registration_ids: list
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "key=AAAAv_NYWa4:APA91bEv_8joSyJhsPqPh0tPA1-6-IMN01sSZ1d-N8vTHyaSOGRBpRa67GhXEDDi-yi5lOCiBpuyoUWJLcMiqQx_iWBihl66NHTtKM22kY_WpEwc8CcUyaJU4TfzwEJWZQ6pktzD8YaL"
          }
        }
      )
      .then(response => {
        console.log(response);
        resolve(response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  //insert Token(Push Notification)
  insertToken(token) {
    console.log("insert token");
    return axios.post("http://70.12.246.138:3000/fcm", {
      fcm_token: token
    });
  },
  async getTokenlist() {
    return await axios.get("http://70.12.246.138:3000/fcm");
  },
  // JWT Token 관리
  async getRefreshToken(user_id) {
    return await axios
      .get("http://70.12.246.138:3000/jwt/" + user_id)
      .then(res => res.data);
  },
  async getNewAccessToken(user_id) {
    return await axios
      .post("http://70.12.246.138:3000/jwt/" + user_id)
      .then(res => res.data);
  },
  async deleteRefreshToken(user_id) {
    return await axios
      .put("http://70.12.246.138:3000/jwt/" + user_id)
      .then(res => res.data);
  },
  async checkAccessToken(user_id, data) {
    return await axios
      .post("http://70.12.246.138:3000/jwt/check/" + user_id, data)
      .then(res => res.data);
  },
  async getUserIdByJWT() {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return await axios
      .get("http://70.12.246.138:3000/jwt/user/id")
      .then(res => res.data);
  },
  async getUserGradeByJWT() {
    axios.defaults.headers.jwt = sessionStorage.jwt;
    return await axios
      .get("http://70.12.246.138:3000/jwt/user/grade")
      .then(res => res.data);
  }
};
