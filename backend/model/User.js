var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  user_id: String,
  posts: [
    {
      post_name: String,
      post_content: String,
      post_thumbnail: String,
      post_date: Date
    }
  ],
  repositories: [
    {
      repository_title: String,
      repository_subtitle: String,
      repository_last_update: Date
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
