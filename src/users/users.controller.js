const { UserModel } = require("../auth/auth.model");

exports.GetCurrentUser = (req, res, next) => {
  const {email, subscription} = req.user;
  res.status(200).send({email, subscription})
}

exports.UpdateUserSubscription = async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, req.body, {new:true})
  return res.status(204).send();
}