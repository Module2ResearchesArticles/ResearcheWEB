const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idObject = Schema.Types.ObjectId;
const documentSchema = new Schema({
  name: String,
  description: String,
  repository: {
    type:   idObject,
    ref:    "Repository"
  },
  motherDocument: {
    type:   idObject,
    ref:    "Document"
  },
  parentDocument: {
    type:   idObject,
    ref:    "Document"
  },
  version: {
    type: Number,
    default: 1
  },
  authorizations: [String],
  locationUrl: String,
  content: String,
  defaultVersion: {
    type: Boolean,
    default: true
  }
},{
  timestamps: {
    createdAt : "created_at",
    updatedAt : "updated_at"
  }
});
const Document = mongoose.model("Document",documentSchema);
module.exports = Document;