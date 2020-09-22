const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { createPost, getPosts, getPost, editPost, deletePost, addLike, addComment, unlike, deleteComment, editComment, getComments, getLikes, getComment } = require('../controllers/Post');

//post
//api/v1/post
router.post('/', protect, createPost);

//get
//api/v1/post
router.get('/', protect, getPosts);

//get
//api/v1/post/:postID
router.get('/:postID', getPost);

//put
//api/v1/post/:postID
router.put('/:postID', protect, editPost);

//delete
//api/v1/post/:postID
router.delete('/:postID', protect, deletePost);

//add like
//post
//api/v1/post/:postID/like
router.post('/:postID/like', protect, addLike);

//unlike post
//post
//api/v1/post/:postID/unlike
router.post('/:postID/unlike', protect, unlike);

//add comment
//post
//api/v1/post/:postID/commment
router.post('/:postID/comment', protect, addComment);

//delete comment
//delete
//api/v1/post/:postID/deletecomment
router.delete('/:postID/:commentID', protect, deleteComment);

//edit comment
//put
////api/v1/post/:postID/commment

router.put('/:postID/:commentID', protect, editComment);

//get
//api/v1/post/:postID/comments
router.get('/:postID/comments', getComments);

//get
router.get("/:postID/comments/:commentID", getComment);


//GET likes
// api/v1/post/:postID/likes
router.get('/:postID/likes', getLikes);


module.exports = router;