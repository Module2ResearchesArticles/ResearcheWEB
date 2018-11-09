const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idObject = Schema.Types.ObjectId;
const docMotherSchema = new Schema({
  name: String,
  description: String,
  repository: {
    type:   idObject,
    ref:    "Repository"
  },
},{
  timestamps: {
    createdAt : "created_at",
    updatedAt : "updated_at"
  }
})

const DocMother = mongoose.model("DocMother", docMotherSchema);
module.exports = DocMother;