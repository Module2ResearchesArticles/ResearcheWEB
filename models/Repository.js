const mongoose = require('mongoose'),
const Schema = mongoose.Schema;
const repositorySchema = new Schema({
  name: String,
  description: String,
  author: String,
  childDocuments: [String],
  authorizations: [String]
  // locationUrl: String,
},{
  timestamps: {
    createdAt = "created_at",
    updatedAt = "updated_at"
  }
});
const Repository = mongoose.model("User",repositorySchema);
module.exports = Repository;