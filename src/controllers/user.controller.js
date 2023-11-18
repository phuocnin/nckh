const UserModels = require("../models/user.model");
const error = require("../utils/error.js");
const catchAsync = require("../utils/catchAsync.js");
const filterObj = require("../utils/filterObj.js");
const Features = require("../utils/Features.js");
const { getAll, getOne, updateOne } = require("./factory.js");
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new error(
        "if you want to change my password, please use /updatePassword",
        400
      )
    );
  }
  req.body = filterObj(req.body, "name", "email");
  req.params.id = req.user._id;
  next();
});
exports.deleteMe = catchAsync(async (req, res, next) => {
  const users = await UserModels.findByIdAndUpdate(req.user.id, {
    status: "block",
  });
  res.status(200).json({
    status: "success!!!",
    message: "delete user",
    data: null,
  });
});
exports.getUsers = getAll(UserModels);
exports.getUser = getOne(UserModels);
exports.updateUser = updateOne(UserModels);
