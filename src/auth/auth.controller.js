const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Conflict, NotFound, Unauthorized } = require('../helpers/errors/Conflict');
const { UserModel } = require('./auth.model')

signUp = async (req, res, next) => {
  const existing = await UserModel.findOne({email});
  const {email, password} = req.body;
  if(existing){
    throw new Conflict("Email in use");
  } 
  const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS)
  const user = await UserModel.create({email, passwordHash});
  return res.status(201).send({user:{email, subscription:user.subscription}});
}

signIn = async (req, res, next) => {
  const {email, password} = req.body;
  const existing = await UserModel.findOne({email});

  if(!existing){
    throw new NotFound('User with such email was not found')
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

signOut = async (req, res, next) => {
  const {user, token} = req;
  await UserModel.updateOne( { _id: user._id}, {
  $pull :{ tokens: token}
  })
  return res.status(204).send();
}

module.exports = {
  signUp,
  signIn,
  signOut
}