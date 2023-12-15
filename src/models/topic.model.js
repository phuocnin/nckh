const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const TopicSchema = mongoose.Schema(
  {
    ThanhVien: [
      {
        type: ObjectId,
        ref: "userModel",
      },
    ],
    TenDeTai: {
      type: String,
      required: [true, "cần nhập tên đề tài!!!"],
    },
    MoTa: {
      type: String,
      required: [true, "cần nhập mô tả!!!"],
    },
    GhiChu: String,
    MaNganh: {
      type: String,
      required: [true, "vui lòng nhập mã ngành"],
    },
    KetQua: String,
    TrangThai: {
      type: String,
      enum: [
        "phân công xét duyệt",
        "đang xét duyệt",
        "đang thực hiện",
        "phân công nghiệm thu",
        "đang nghiệm thu",
        "hoàn thành",
        "hủy",
      ],
      default: "phân công xét duyệt",
    },
    NhanXet: String,
    KinhPhi: Number,
    Diem: Number,
    GiangVien: {
      type: ObjectId,
      ref: "userModel",
    },
    HoiDong: {
      type: ObjectId,
      ref: "userModel",
    },
    NgayThucHien: Date,
    NgayKetThuc: Date,
    file: [],
  },
  {
    collection: "topic",
    timestamps: true,
  }
);
const ReseachModels = mongoose.model("topicModel", TopicSchema);
module.exports = ReseachModels;
