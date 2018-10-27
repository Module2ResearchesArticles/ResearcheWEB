const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  email: String,
  active: {
    type: Boolean,
    default: false
  },
  confirmationCode: String
},{
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})
userSchema.plugin(passportLocalMongoose,{ usernameField: "email"});

const User = mongoose.model("User",userSchema);
module.exports = User;


