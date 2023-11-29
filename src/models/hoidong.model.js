const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const HoiDong = mongoose.Schema(
  {
    TenHoiDong: {
      type: String,
      required: [true, "cần nhập tên hội đồng!!!"],
    },
    ChuTich: {
      type: ObjectId,
      ref: "userModel",
      required: [true, "cần nhập chủ tịch"],
    },
  },
  {
    collection: "HoiDong",
    timestamps: true,
  }
);
const HoiDongModels = mongoose.model("HoiDong", HoiDong);
module.exports = HoiDongModels;
