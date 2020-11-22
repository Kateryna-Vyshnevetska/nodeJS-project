const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string(),
})

exports.updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string(),
}).min(1)

exports.validateIdSchema = Joi.object({
  contactId: Joi.objectId(),
})

exports.UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  avatarURL: Joi.string(),
})

exports.UpdateSubUser = Joi.object({
  subscription: Joi.string().valid("free", "pro", "premium").required()
})

exports.UpdateAvatarUser = Joi.object({
  avatar: Joi.string(),
})

exports.FiltredContacts = Joi.object({
  sub: Joi.string().valid("free", "pro", "premium"),
  page: Joi.string(),
  limit: Joi.string(),
})