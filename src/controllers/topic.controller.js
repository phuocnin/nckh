const catchAsync = require("../utils/catchAsync");
const error = require("../utils/error");
const topicModel = require("../models/topic.model");
const factory = require("./factory");
const filterObj = require("../utils/filterObj");

exports.home = factory.getAll(topicModel, "home");
exports.getTopics = factory.getAll(topicModel, "topic_list");
exports.getTopic = catchAsync(async (req, res, next) => {
  const data = await topicModel.findById(req.params.id).populate("ThanhVien");
  if (!data) return next(new error("No document found with that ID", 404));
  res.status(200).render("view_topic", { data, user: req.user });
});
exports.postTopic = factory.createOne(topicModel);
exports.updateTopic = factory.updateOne(topicModel);
exports.filterByRole = catchAsync(async (req, res, next) => {
  if (req.user.role == "admin") {
    req.body = filterObj(req.body, "GiangVien", "HoiDong");
    next();
  }

  if (req.user.role == "sinh_vien" && req.user.DeTai.includes(req.params.id)) {
    req.body = filterObj(
      req.body,
      "ThanhVien",
      "TenDeTai",
      "GhiChu",
      "MaNganh",
      "NgayThucHien",
      "NgayKetThuc",
      "KinhPhi"
    );
    next();
  }
  if (req.user.role == "giao_vien" && req.user.DeTai.includes(req.params.id)) {
    req.body = filterObj(req.body, "Diem", "NhanXet");
    next();
  }
  return next(new error("Bạn không có quyền thực hiện hành động này", 403));
});

exports.deleteTopic = factory.deleteOne(topicModel);
