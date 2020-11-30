const { UserModel } = require("../auth/auth.model");
const { asyncWrapper } = require("../helpers/async-wrapper");

exports.GetCurrentUser = (req, res, next) => {
  const {email, subscription, avatarURL} = req.user;
  res.status(200).send({email, subscription, avatarURL})
}

exports.UpdateUserSubscription = async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, req.body, {new:true})
  return res.status(204).send();
}

exports.UpdateUserAvatar = async (req, res, next) => {
  const avatarURL = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
  await UserModel.findByIdAndUpdate(req.user._id, {avatarURL}, {new:true})
  res.status(204).send();
}