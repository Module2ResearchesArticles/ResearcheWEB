const mongoose = require('mongoose'),
const Schema = mongoose.Schema;
const idObject = Schema.Types.ObjectId;
const repositorySchema = new Schema({
  name: String,
  description: String,
  author: {
    type: idObject,
    ref: "User"
  },
  childDocuments: [idObject],
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