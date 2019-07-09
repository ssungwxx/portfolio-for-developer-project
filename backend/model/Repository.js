var mongoose = require("mongoose");

var RepositorySchema = new mongoose.Schema({
  repository_title: String,
  repository_subtitle: String,
  repository_last_update: Date
});

module.exports = mongoose.model("Repository", RepositorySchema);
