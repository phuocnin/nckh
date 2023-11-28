const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ThongBao = mongoose.Schema(
  {
    ThongBao: {
      type: String,
      required: [true, "cần nhập tên thông báo!!!"],
    },
    NoiDung: {
      type: String,
      required: [true, "cần nhập nội dung!!!"],
    },
    NgayDang: Date,
    file: [],
  },
  {
    collection: "thongbao",
    timestamps: true,
  }
);
const ThongBaoModels = mongoose.model("thongbao", ThongBao);
module.exports = ThongBaoModels;
