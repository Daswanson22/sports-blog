const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      set: toLower
    },
    username: {
      type: String,
      unique: true,
      required: true,
      set: toLower
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {timestamps: true}
);

UserSchema.pre('save', async function(next) {
  const user = this;
  if(!user.isModified('password'))
  {
    return next();
  }

  try {
    // Encrypt password once.
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (password)
{
  return bcrypt.compare(password, this.password);
};

function toLower(string)
{
  return string.toLowerCase();
}

// Export model
module.exports = mongoose.model("User", UserSchema);
