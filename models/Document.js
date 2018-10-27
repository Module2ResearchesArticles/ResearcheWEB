const mongoose = require('mongoose'),
const Schema = mongoose.Schema;
const documentSchema = new Schema({
  name: String,
  description: String,
  author: String,
  repository: String,
  parentDocument: String,
  childDocuments: [String],
  authorizations: [String],
  locationUrl: String,
  defaultVersion: {
    type: Boolean,
    default: true
  }
},{
  timestamps: {
    createdAt = "created_at",
    updatedAt = "updated_at"
  }
});
const Document = mongoose.model("User",documentSchema);
module.exports = Document;