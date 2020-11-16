const mongoose = require ('mongoose');

const {Schema} = mongoose;

const ContactSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required:true},
  phone: {type: String, required: true},
  subscription: {type: String, required: true},
  password: {type: String, required:true},
  token: {type: String},
})

exports.ContactModel = mongoose.model('Contact', ContactSchema)