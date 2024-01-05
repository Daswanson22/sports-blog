const mongoose = require("mongoose");
const crypto = require('crypto');
// var passportLocalMongoose = require('passport-local-mongoose'); 
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 15;

const UserSchema = new Schema({
  first_name: { 
    type: String, 
    required: true, 
    maxLength: 100 
  },
  last_name: { 
    type: String, 
    required: true, 
    maxLength: 100 
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  }, 
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  }
});

UserSchema.methods.setPassword = function(password) 
{
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hashed_password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha256`).toString('hex');
}

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password,
      this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};


// UserSchema.plugin(passportLocalMongoose);

// // Virtual for author's full name
// UserSchema.virtual("name").get(function () {
//   // To avoid errors in cases where an author does not have either a family name or first name
//   // We want to make sure we handle the exception by returning an empty string for that case
//   let fullname = "";
//   if (this.first_name && this.last_name) {
//     fullname = `${this.last_name}, ${this.first_name}`;
//   }

//   return fullname;
// });

// // Virtual for author's URL
// UserSchema.virtual("url").get(function () {
//   // We don't use an arrow function as we'll need the this object
//   return `/account/${this._id}`;
// });

// Export model
module.exports = mongoose.model("User", UserSchema);
