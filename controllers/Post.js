const Profile = require('../model/Profile');
const asyncHandeler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../utils/comment');


//post
//create post
//api/v1/post
exports.createPost = asyncHandeler(async (req, res, next) => {

  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse('Please open a Profile', 404));
  }
  req.body.user = req.user.id;
  const post = await Post.create(req.body);

  profile.posts.unshift(post);

  await profile.save();

  res.json({
    success: true,
    data: post
  })

})

//get
//get posts
//api/v1/post

exports.getPosts = asyncHandeler(async (req, res, next) => {
  const post = await Post.find().populate({
    path: "user", select: "name avater profile"
  }).sort({ date: -1 });
  res.json({
    success: true,
    count: post.length,
    data: post
    // likesCount: post.likes.length
  })
})

//get 
//get single post
//api/v1/post/:postID


exports.getPost = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);
  if (!post) {
    return next(new ErrorResponse('No Post Available', 404));
  }
  res.json({
    success: true,

    data: post,
    likesCount: post.likes.length
  })
});

//put
//edit post
//api/v1/post/:postID

exports.editPost = asyncHandeler(async (req, res, next) => {

  const post = await Post.findByIdAndUpdate(req.params.postID, req.body, {
    new: true,
    runValidators: true
  })

  await post.save();
  res.json({
    success: true,

    data: post
  })
});

//delete
//api/v1/:postID
exports.deletePost = asyncHandeler(async (req, res, next) => {
  let post = await Post.findById(req.params.postID);
  // console.log(post);
  if (!post) {
    return next(new ErrorResponse('No Post Available', 404));
  }
  post = await Post.deleteOne({ _id: req.params.postID });
  res.json({
    success: true,
    data: {}
  });
})

//post
//api/v1/post/:postID/like
exports.addLike = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);
  const user = await User.findOne({ _id: req.user.id });

  if (post.likes.find(el => el.id.toString() === req.user.id)) {
    return next(new ErrorResponse("U already liked it"));
  }
  post.likes.push(user);
  post.count.like = post.likes.length;

  await post.save();

  res.json({
    success: true,
    data: post,
    likeCount: post.count.like

  })
})

//post
//api/v1/post/:postID/comment
exports.addComment = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);
  const userModel = await User.findOne({ _id: req.user.id });


  req.body.name = userModel.name;
  req.body.profile = userModel.profile ? userModel.profile : null
  //console.log(req.body.profile);


  let comment = new Comment(req.user.id, req.body.name, req.body.text, req.body.profile);

  //console.log(comment)

  post.comments.push(comment);
  post.count.comment = post.comments.length;

  await post.save();

  res.json({
    success: true,
    data: post,
    commentsCount: post.comments.length

  })

});

//post
//api/v1/post/:postID/unlike
exports.unlike = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);

  if (!post.likes.find(el => el.id.toString() === req.user.id)) {
    return next(new ErrorResponse("U cant unlike it"));
  }

  post.likes = post.likes.filter(el => el.id.toString() !== req.user.id);

  post.count.like = post.likes.length;

  await post.save();

  res.json({
    success: true,
    data: post,
    likeCount: post.count.like
  })

})

//post
//delete comment
//api/v1/post/:postID/:commentID
exports.deleteComment = asyncHandeler(async (req, res, next) => {

  const user = await User.findOne({ _id: req.user.id })

  if (!user) {
    return next(new ErrorResponse("No user found", 404));
  }


  const post = await Post.findById(req.params.postID);

  //vanilla JS


  let actualComment;

  post.comments.forEach(el => {
    if (el._id.toString() === req.params.commentID && el.user.toString() === req.user.id) {
      actualComment = el;
    }

  })

  let comments = [...post.comments];
  comments = comments.filter(el => el._id !== actualComment._id);


  post.comments = [...comments];
  await post.save();

  res.json({
    success: true,
    data: post

  })

});
//edit comment
//put 
//api/v1/post/:postID/:commentID

exports.editComment = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);

  const comment = post.comments.find(el => (el._id.toString() === req.params.commentID) && (el.user.toString() === req.user.id));

  comment.text = req.body.text;

  await post.save();

  res.json({
    success: true,
    data: post
  })

})

//getAll comments
//get
//api/v1/post/:postID/comments
exports.getComments = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);
  res.json({
    success: true,
    data: post.comments,

  })
})

// get likes count
// get
// api/v1/post/:postID/likes
exports.getLikes = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);
  res.json({
    success: true,
    data: post.likes
  })
})

//get Signle comment 
//get
//api/v1/post/:postID/comments/:commentID

exports.getComment = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID);

  const index = post.comments.findIndex(el => el.id.toString() === req.params.commentID);
  const commentText = post.comments[index].text;
  //const commentId = post.comment[index]._id;

  //console.log(commentId);

  res.json({
    success: true,
    commentText,
    commentId: req.params.commentID,
    postId: req.params.postID
  })

})







