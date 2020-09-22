const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const { getMe, createProfile, updateProfile, getProfiles, getProfile, deleteProfile, addSocial, addEducation, editEducation, deleteEducation, getAllEducation, getSingleEducation } = require('../controllers/Profile');

//get
//api/v1/profile/me
router.get('/me', protect, getMe)

//get
//api/v1/profile
router.get('/', protect, authorize('admin'), getProfiles);

//get
//api/v1/profile/:profileID
router.get('/:profileID', getProfile);


//post
//api/v1/profile/createuser
router.post('/createprofile', protect, createProfile);

//put
//api/v1/profile/updateprofile
router.get('/updateProfile', protect, getMe);

//get(get upfdate profile to populate)
//api/v1/profile/:profileId/updateprofile
router.put('/:profileId/updateprofile', protect, updateProfile);

//delete
//api/v1/profile/deleteprofile

router.delete('/deleteprofile', protect, deleteProfile);

//add-social
//api/v1/profile/:profileId/addsocilal
router.post('/:profileId/addsocial', protect, addSocial)

//edit-social
//api/v1/profile/:profileId/editsocilal
router.put('/:profileId/editsocial', protect, addSocial)

//get all education
//api/v1/profile/:profileId/geteducations
router.get('/:profileId/geteducations', protect, getAllEducation);


//get single education
//api/v1/profile/:profileId/:educationId
router.get("/:profileId/:educationId", protect, getSingleEducation);

//add education
//api/v1/profile/:profileId/addeducation
router.post("/:profileId/addeducation", protect, addEducation);

//edit education
//api/v1/profile/:profileId/:educationId

router.put('/:profileId/:educationId', protect, editEducation);

//delete education
//api/v1/profile/:profileId/:educationId
router.delete('/:profileId/:educationId', protect, deleteEducation);

module.exports = router;