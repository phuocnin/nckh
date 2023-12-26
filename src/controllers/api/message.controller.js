const messageModel = require("../../models/message.model");
const factory = require("./factory");
const catchAsync = require("../../utils/catchAsync");
exports.addSender = catchAsync(async (req, res, next) => {
  req.body.sender = req.user._id;
  next();
});

exports.getcouncils = factory.getAll(messageModel);
exports.getcouncil = factory.getOne(messageModel);
exports.postcouncil = factory.createOne(messageModel);
exports.updatecouncil = factory.updateOne(messageModel);
exports.deletecouncil = factory.deleteOne(messageModel);
