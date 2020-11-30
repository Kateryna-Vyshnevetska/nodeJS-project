const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { avatarGenerate } = require('../helpers/avatar-generator');
const { Conflict, NotFound, Unauthorized, Unverify } = require('../helpers/errors/Conflict');
const { UserModel } = require('./auth.model');
const { MoveFile } = require('../helpers/moveFiles');
const { asyncWrapper } = require('../helpers/async-wrapper');
const { mailing } = require('../helpers/mailing');

exports.signUp = async (req, res, next) => {
  const {email, password} = req.body;
  const existing = await UserModel.findOne({email});
  if(existing){
    throw new Conflict("Email in use");
  }
  const avatar = await avatarGenerate();
  asyncWrapper(MoveFile(avatar));
  const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS)

  const user = await UserModel.create({email, passwordHash, 
    avatarURL:`${process.env.DOMAIN_ADDRESS}/images/${avatar}`,
    verificationToken: uuid.v4()});
    mailing.sendEmailForVarification(user);
  return res.status(201).send({user:{email, subscription:user.subscription, avatarURL:user.avatarURL}});
}

exports.signIn = async (req, res, next) => {
  const {email, password} = req.body;
  const existing = await UserModel.findOne({email});

  if(!existing){
    throw new NotFound('User with such email was not found')
  }
  if(existing.verificationToken !== null){
    throw new Unverify('Please verify your email')
  }
  const validPassword = await bcrypt.compare(password, existing.passwordHash);
  if(!validPassword){
    throw new Unauthorized('Email or password is wrong');
  }
  const token = jwt.sign({userID: existing._id}, process.env.JWT_SECRET, {
    expiresIn: '2d',
  })
  await UserModel.findByIdAndUpdate(existing._id, { $push: {tokens: token} } )
  return res.status(201).send({
    token,
    user:
      {email, subscription:existing.subscription}
    }
  );
}

exports.signOut = async (req, res, next) => {
  const {user, token} = req;
  await UserModel.updateOne( { _id: user._id}, {
  $pull :{ tokens: token}
  })
  return res.status(204).send();
}

exports.verifyEmail = async( req, res, next) => {
  const {verificationToken} = req.params;
  const user = await UserModel.findOne({verificationToken}) 
  if(!user){
    throw new NotFound('User not found or email is already varifed');
  }
  await UserModel.updateOne({_id: user._id}, {verificationToken: null})
  res.status(200).send('Varification was successful');
}
