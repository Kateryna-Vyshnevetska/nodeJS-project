const mongoose = require ('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  subscription: {type: String, enum:["free", "pro", "premium"], default:"free"},
  avatarURL: {type: String, unique: true},
  tokens: [{type: String}],
  verificationToken: {type: String}
})

exports.UserModel = mongoose.model('User', UserSchema)