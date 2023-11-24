const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "cần nhập tên"],
    },
    id: {
      type: String,
      unique: true,
      required: [true, "cần id"],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      validate: [validator.isEmail, "email không hợp lệ"],
    },
    role: {
      type: String,
      enum: ["admin", "giao_vien", "sinh_vien"],
      default: "sinh_vien",
    },
    ngaysinh: {
      type: Date,
    },
    gioitinh: {
      type: Boolean,
    },
    sdt: String,
    khoa: String,
    trinhdo: String,
    password: {
      type: String,
      required: [true, "cần mật khẩu"],
      minLength: [6, "Tối thiểu 6 kí tự"],
    },
    status: {
      type: String,
      enum: ["active", "block"],
    },
    DeTai: [
      {
        type: ObjectId,
        ref: "topicModel",
      },
    ],
    resetToken: String,
    resetTokenExpires: Date,
    jwtExpires: Date,
  },
  {
    collection: "user",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkjwtExpires = function (jwtIat) {
  if (this.jwtExpires) {
    const jwtExpires = parseInt(this.jwtExpires.getTime() / 1000, 10);

    return jwtExpires > jwtIat;
  }
  return false;
};

userSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};
const UserModels = mongoose.model("usermodels", userSchema);
module.exports = UserModels;
