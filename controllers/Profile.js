const Profile = require('../model/Profile');
const asyncHandeler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require('../model/User');
const apiTest = require('../utils/githubApi');
const Repository = require('../utils/repo');
const Post = require('../model/Post');

//get
//api/v1/profile/me

exports.getMe = asyncHandeler(async (req, res, next) => {

  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user posts'
  });
  if (!profile) {
    return next(new ErrorResponse("Please Open a profile"));
  }
  if (!profile.githubusername) {
    return res.json({
      success: true,
      data: profile
    })
  }
  advancedResponse(profile, res);

})

const advancedResponse = (profile, res) => {
  const repoCollection = new Array();
  if (profile.githubusername) {
    apiTest(profile.githubusername).then(response => {
      response.forEach(el => {
        const repo = new Repository(el.name, el.language, el.html_url, el.description, el.owner.avatar_url, el.stargazers_count, el.forks_count);

        repoCollection.push(repo);

      })
      res.json(
        { success: true, data: profile, repos: repoCollection }
      )
    });
  }
}

//post
//api/v1/profile/createProfile

exports.createProfile = asyncHandeler(async (req, res, next) => {
  req.body.user = req.user.id;


  const user = await User.findOne({ _id: req.user.id });

  if (user.profile) {
    return next(new ErrorResponse("you already have a profile", 400))
  }
  const profile = await Profile.create(req.body);
  user.profile = profile._id;
  // console.log(user);

  await user.save();

  res.json({
    success: true,
    data: profile
  })
})

//put
//api/v1/profile/:profileId/updateprofile

exports.updateProfile = asyncHandeler(async (req, res, next) => {

  const profile = await Profile.findById(req.params.profileId);
  const { bio, githubusername, skills, website } = req.body;
  profile.bio = bio;
  profile.githubusername = githubusername;;
  profile.skills = skills;
  profile.website = website;
  profile.save();
  res.json({
    data: profile
  })


});

//get all profile

//api/v1/profile

exports.getProfiles = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.find();

  res.json(
    { success: true, count: profile.length, data: profile }
  )
})

//get
//get single profile
//api/v1/profile/:profileID

exports.getProfile = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileID).populate({
    path: "user posts"
  });
  if (!profile) {

    return next(new ErrorResponse("No profile available", 404));
  }
  if (!profile.githubusername) {
    return res.json({
      success: true,
      data: profile
    })
  }

  advancedResponse(profile, res);


});

//delete
//delete profile
//api/v1/profile/deleteprofile

exports.deleteProfile = asyncHandeler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  const profile = await Profile.deleteOne({ user: req.user.id });

  const post = await Post.deleteMany({ user: req.user.id });



  user.profile = undefined;


  await user.save();
  // console.log(user);

  res.json({
    success: true,
    data: {}
  })
})


//add experience
//api/v1/profile/add-experiance

exports.addExperience = asyncHandeler(async (req, res, next) => {
  req.body.user = req.user.id;


  const user = await User.findOne({ _id: req.user.id });


})

//add social links
//api/v1/profile/:profileId/addsocilal
exports.addSocial = asyncHandeler(async (req, res, next) => {

  const profile = await Profile.findById(req.params.profileId);

  profile.social.youtube = req.body.youtube;
  profile.social.facebook = req.body.facebook;
  profile.social.twitter = req.body.twitter;
  profile.social.instagram = req.body.instagram;
  profile.social.linkedin = req.body.linkedin

  profile.save();

  res.json({
    success: true,
    data: profile
  })

  // console.log(profile)


});

//get education
//api/v1/profile/:profileId/geteducations

exports.getAllEducation = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);
  const education = profile.education;
  res.json({
    success: true,
    data: education
  })
})

//get single education
//api/v1/profile/:profileId/:educationId
exports.getSingleEducation = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);
  const education = profile.education.find(el => el._id.toString() === req.params.educationId);
  //console.log(education);
  res.json({
    success: true,
    data: education
  })
})



//add education
//api/v1/profile/:profileId/addeducation
exports.addEducation = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);

  //console.log(profile.education);

  profile.education.push(req.body);

  profile.save();

  res.json({
    success: true,
    data: profile
  })

})

//edit education
//api/v1/profile/:profileId/:educationId
exports.editEducation = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);

  // /profile.education.forEach(el => console.log(el));
  let education = profile.education.find(el => el._id.toString() === req.params.educationId);
  let educationArray = profile.education.filter(el => el._id.toString() !== req.params.educationId);
  profile.education = educationArray;

  education = req.body;
  // education._id = req.params.educationId;

  profile.education.push(education);

  profile.save();

  // console.log(educationArray);
  // console.log(education)
  res.json({
    success: true,
    data: profile.education
  })
})

//api/v1/profile/:profileId/:educationId
exports.deleteEducation = asyncHandeler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.profileId);

  let education = profile.education.filter(el => el._id.toString() !== req.params.educationId);

  // console.log(education);

  profile.education = education;

  profile.save();

  res.json({
    success: true,
    data: education
  })
})








