const User = require('../model/User');
const asyncHandeler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require('../utils/sendEmail');
const Profile = require('../model/Profile');
const crypto = require('crypto');


//get users
//api/v1/user

exports.getUsers = asyncHandeler(async (req, res, next) => {
  const user = await User.find();
  res.json({
    success: true,
    user: user
  })
})


//post
//api/v1/user/regestraion

exports.addUser = asyncHandeler(async (req, res, next) => {
  const user = await User.create(req.body);

  // res.redirect(`http://localHost:3000/dashboard/${user._id}`);
  sendTokenResponse(user, 200, res);

});

//post
//api/v1/user/login
exports.loginUser = asyncHandeler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Invalid login', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('No user found please regester', 400));
  }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid login', 400));
  }

  sendTokenResponse(user, 200, res);
})

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  res
    .status(statusCode)
    .cookie('token', token, option)
    .json(
      { success: true, token, data: user }
    )
}

//put
//api/v1/user/updatedetails
exports.updateDetails = asyncHandeler(async (req, res, next) => {


  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  })

  res.json(
    { success: true, data: user }
  )

});
//get 
//api/v1/user/profile
//get current user profile
exports.getMe = asyncHandeler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res
    .status(200)
    .json(
      { success: true, user }
    )
});


//delete
//api/v1/user/deleteuser

exports.deleteUser = asyncHandeler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);
  const profile = await Profile.deleteOne({ user: req.user.id });
  const post = await Post.deleteMany({ user: req.user.id });
  res.json({
    success: true,
    data: {}
  })
})

//forgetpassword
//api/v1/user/forgetpassword
exports.forgetPassowrd = asyncHandeler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(`No user found`, 400));
  }

  const resetToken = user.getResetPasswordToken();



  await user.save({ validateBeforeSave: false })

  const resetURL = `${req.protocol}://${req.get('host')}//api/v1/user/resetpassword/${resetToken}`;

  const message = `You are receving a massage to reset your password. please make a PUT req to :\n\n ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message: message
    })

    res.json(
      { success: true, data: "email sent", user }
    )
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpaire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email couldnot be sent", 500));
  }


})
//reset password
//api/v1/user/resetpassword/:resetToken

exports.resetPassword = asyncHandeler(async (req, res, next) => {
  const resetToken = req.params.resetToken;

  const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  console.log(user);
  if (!user) {
    return next(new ErrorResponse(`No user found`, 401));

  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);

})

//update password
//api/v1/user/updatepassword
exports.updatePassword = asyncHandeler(async (req, res, next) => {

  const user = await User.findOne({ _id: req.user.id }).select('+password');

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse(`Password is incorrect`, 401));

  }
  user.password = req.body.newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

//post 
//logout
//api/v1/user/logout

exports.logOut = asyncHandeler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.json({
    success: false,
    data: {}
  })
});

//get user by id
//api/v1/user/:userID

exports.getUser = asyncHandeler(async (req, res, next) => {
  const user = await User.findById(req.params.userID);
  res.json({
    seccess: true,
    user
  })
})

