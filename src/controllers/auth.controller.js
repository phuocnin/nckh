const userModels = require("../models/user.model.js");
const catchAsync = require("../utils/catchAsync.js");
const jwt = require("jsonwebtoken");
const error = require("../utils/error.js");
//const sendEmail = require("../utils/email.js");
const crypto = require("crypto");

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
