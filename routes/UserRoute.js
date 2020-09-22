const express = require('express');
const router = express.Router();

const { addUser, loginUser, updateDetails, getMe, deleteUser, forgetPassowrd, resetPassword, getUsers, updatePassword, logOut, getUser } = require('../controllers/User');

const { protect } = require('../middleware/auth');

//post
//api/v1/user/regestraion
router.post('/regestration', addUser);

//api/v1/user/login
router
  .route('/login')
  .post(loginUser);
router
  .route('/forgetPassword')
  .post(forgetPassowrd)

//api/v1/user/updatedetails
router
  .route('/updatedetails')
  .put(protect, updateDetails);

//api/v1/user/getMe
router
  .route('/getMe')
  .get(protect, getMe);

router.get('/', getUsers)

//api/v1/user/deletuser
router
  .route('/deleteuser')
  .delete(protect, deleteUser)

//api/v1/user/resetpassword/:resetToken
router.post('/resetpassword/:resetToken', resetPassword);

//api/v1/user/updatepassword
router.put('/updatepassword', protect, updatePassword);

//api/v1/user/logout
router.post('/logout', protect, logOut);

//api/v1/user/:userID

router.get('/:userID', protect, getUser);


module.exports = router;