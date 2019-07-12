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
      .put("http://70.12.246.138:3000/posts/", data)
      .then(response => (this.posts = response.data));
  }
};
