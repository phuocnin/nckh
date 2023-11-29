const catchAsync = require("../utils/catchAsync");
const error = require("../utils/error");
const topicModel = require("../models/topic.model");
const notifyModel = require("../models/notify.model");
const factory = require("./factory");
const filterObj = require("../utils/filterObj");

exports.home = factory.getAll(notifyModel, "home");
exports.getTopics = factory.getAll(topicModel, "project_list");
exports.getTopic = factory.getOne(topicModel, "view_topic");
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
