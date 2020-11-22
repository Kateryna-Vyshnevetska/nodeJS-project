const mongoose = require ('mongoose');
const mongoosePaginate = require ('mongoose-paginate-v2');
const {Schema} = mongoose;

const ContactSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required:true},
  phone: {type: String, required: true},
  subscription: {type: String, required: true},
  password: {type: String, required:true},
  token: {type: String},
})

ContactSchema.plugin(mongoosePaginate);

exports.ContactModel = mongoose.model('Contact', ContactSchema)

