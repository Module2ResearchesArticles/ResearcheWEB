const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: String
},{
  timestamps: {
    createdAt = "created_at",
    updatedAt = "updated_at"
  }
})
userSchema.plugin(passportLocalMongoose,{ usernameField: "email"});

const User = mongoose.model("User",userSchema);
module.exports = User;


