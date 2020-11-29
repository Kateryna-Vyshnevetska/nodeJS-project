const jwt = require('jsonwebtoken');
const { UserModel } = require('../auth/auth.model');
const { Unauthorized } = require('./errors/Conflict');

exports.authorize = async (req, res, next) => {
  try{
    const authHeader = req.get('Authorization') || '';
    const token = authHeader.replace("Bearer ", '');
    let payload;
    try{
      payload = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
      throw new Unauthorized('Token is not valid')
    }
    const user = await UserModel.findOne({
      _id: payload.userID,
      tokens: token,
    });
    if(!user){
      throw new Unauthorized('Not authorized')
    }
    req.user = user;
    req.token = token;
    next();
  }catch(err){
    next(err);
  }
}