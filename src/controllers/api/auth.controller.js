const userModels = require("../../models/user.model.js");
const catchAsync = require("../../utils/catchAsync.js");
const jwt = require("jsonwebtoken");
const error = require("../../utils/error.js");
//const sendEmail = require("../utils/email.js");
const crypto = require("crypto");

const createSendToken = (user, statusCode, req, res) => {
  const id = user._id;
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.EXPIRES,
  });

  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { id, password } = req.body;
  const user = await userModels.findOne({ id });
  //check user and password
  if (!user || !(await user.checkPassword(password)))
    return next(new error("kiểm tra lại tài khoản hoặc mật khẩu", 201));

  //gửi res, token cho user
  createSendToken(user, 200, req, res);
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await userModels.create(req.body);
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  req.user.jwtExpires = Date.now() - 1000;
  req.user.save();
  res.status(200).json({ status: "success" });
};

exports.authMiddleware = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new error("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  //const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  // 3) Check user
  const currentUser = await userModels.findById(decoded.id);
  if (!currentUser) {
    return next(
      new error("The user belonging to this token does no longer exist.", 401)
    );
  }

  // 4) Check if tokenExpires
  if (currentUser.checkjwtExpires(decoded.iat)) {
    return next(new error(" Please log in again.", 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new error("Bạn không có quyền thực hiện hành động này", 403));
    }

    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword)
    return next(new error("Vui lòng nhập password hoặc newPassword", 201));
  const user = await userModels.findById(req.user._id);
  //check user and password
  if (!user || !(await user.checkPassword(password)))
    return next(new error("password không đúng", 201));

  user.password = newPassword;
  await user.save();
  //gửi res, token cho user
  createSendToken(user, 200, req, res);
});
