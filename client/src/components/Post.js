import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import { getPosts } from "../redux/Post/postAction";





function Post({ post, getPosts, testProp, userName, profile_Id, userId }) {

  //console.log(testProp);
  // states
  const initialState = {
    text: ""
  }
  const [fetchedComments, setFetchedComments] = useState([]);
  const [commentData, setCommentData] = useState(initialState);
  const [likeNum, setLikeNum] = useState(0);
  const [commentNum, setCommentNum] = useState(0);
  const [isLiked, setIsLiked] = useState(null);
  const [isDisliked, setIsDisLiked] = useState(null);
  const [editState, setEditState] = useState(false);
  const [editedCommentData, setEditedCommentData] = useState(initialState);
  const [editedCommentId, setEditedCommentId] = useState('');
  const [editCommentPostId, setEditCommentPostId] = useState('');
  const [displayComment, setDisplayComment] = useState(false);

  //casual variable from local storage
  const userID = localStorage.getItem('userID');


  // background useeffect
  useEffect(() => {
    fetchComments();

    likeCount();
    checkLikeState();

  }, [])


  // casual functions



  // check if the post is liked or not in background
  const checkLikeState = () => {

    const findLike = post.likes.find(el => el._id === userID);
    if (findLike) {
      setIsLiked(true);
      setIsDisLiked(null);
    }
    else {
      setIsLiked(null);
      setIsDisLiked(null);
    }
  }

  //counting the  likes of that post
  const likeCount = () => {
    const likesfrompost = post.likes.map(el => el._id);
    setLikeNum(likesfrompost.length);
  }

  //event listeners
  const handelCommentSubmit = (e) => {
    e.preventDefault();
    postComment();
  }
  const handleCommentChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });

  }
  const handleEditComment = (e) => {
    setEditedCommentData({ ...editedCommentData, [e.target.name]: e.target.value });

  }
  const handelLikeSubmit = (e) => {

    e.preventDefault();
    postLike();
    likeCount();
    checkLikeState();


  }
  const handleSubmitUnlike = (e) => {
    e.preventDefault();
    postUnlike();
    likeCount();
    checkLikeState();

  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editComment(editedCommentId, editCommentPostId);
    setEditState(false);
  }
  const handelCommentState = () => {
    fetchComments();
    setDisplayComment(true);


  }




  //api calls
  //post comment 
  const postComment = async () => {
    try {
      const { data: { success } } = await axios.post(`/api/v1/post/${post._id}/comment`, commentData);
      await fetchComments();
      setCommentData({ text: "" });

    } catch (error) {
      console.log(error)
    }
  }
  //delete a comment
  const deleteComment = async (id) => {
    try {

      await axios.delete(`/api/v1/post/${post._id}/${id}`);
      await fetchComments();

    } catch (error) {
      console.log(error)
    }
  }


  //like a post
  const postLike = async () => {
    try {
      const { data: { likeCount } } = await axios.post(`/api/v1/post/${post._id}/like`);
      setLikeNum(likeCount);
      setIsLiked(true);
      setIsDisLiked(false);


    } catch (error) {
      console.log(error)
    }

  }

  //unlike a post
  const postUnlike = async () => {
    try {
      const { data: { likeCount } } = await axios.post(`/api/v1/post/${post._id}/unlike`);
      setLikeNum(likeCount);
      setIsLiked(false);
      setIsDisLiked(true);

    } catch (error) {
      console.log(error)
    }
  }

  //fetching comments
  const fetchComments = async () => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/post/${post._id}/comments`);


      setFetchedComments(data);
      setCommentNum(data.length);

    } catch (error) {
      console.log(error);
    }
  }

  const getCommentText = async (id) => {
    try {

      const { data: { commentText, commentId, postId } } = await axios.get(`/api/v1/post/${post._id}/comments/${id}`);
      setEditState(true);
      setEditCommentPostId(postId);
      setEditedCommentData({ text: `${commentText}` });
      setEditedCommentId(commentId);




    } catch (error) {
      console.log(error);
    }
  }


  const editComment = async (commentId, postId) => {
    try {
      await axios.put(`/api/v1/post/${postId}/${commentId}`, editedCommentData);
      fetchComments();
      setEditedCommentId('');
      setEditState(false);
      //console.log(editedCommentId)
    } catch (error) {
      console.log(error);
    }
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/v1/post/${id}`);
      getPosts();
      // console.log(id);
    } catch (error) {
      console.log(error.response);
    }
  }






  const showSpecs = (e) => {
    const children = e.target;

    if (children.className === 'post-body') {
      if (children.scrollHeight > children.parentElement.clientHeight) {

        children.parentElement.classList.add("active");
      }
      // console.log(children)
    }

  }



  //console.log(post)

  return (
    <div className="post-container" onClick={showSpecs}>
      <div className="post-uppur">
        {/* <div className="avater"></div> */}
        <div className="user-name-link">
          {testProp !== "profile" ? (<Link className="user-name" to={`/profile/${post.user.profile}`} >{post.user.name}</Link>)
            : (
              <Link className="user-name" to={`/profile/${profile_Id}`} >{userName}</Link>
            )}
        </div>
        <div className={(userID === post.user._id) || (userID === userId) ? "upper-right" : "upper-right-hide"}>
          {/* <button className="edit-post" onClick={() => getPostId(post._id)} > <i className="fas fa-edit"></i></button> */}
          <Link className="edit-post" to={`/editpost/${post._id}`}><i className="fas fa-edit"></i></Link>
          <button className="delete-post" onClick={() => deletePost(post._id)}><i className="fas fa-trash-alt"></i></button>
        </div>
      </div>

      <div className="middle">

        <p className="post-body">{post.text}</p>
        {/* <p className="post-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia vel alias optio blanditiis assumenda. Mollitia magni rerum nihil illo nam reprehenderit laboriosam fugiat est architecto. Et nulla vitae accusamus debitis perferendis tempore dignissimos modi reprehenderit. Eos dolorum reiciendis amet dolore.</p> */}
      </div>
      <div className="middle-middle">
        <div className="post-like">
          <div className="post-like-icon"><i className="fas fa-thumbs-up"></i></div>
          <div className="post-like-count">
            {{ likeNum } === 0 ? "Be The First To like" : `${likeNum} Likes`}
          </div>
        </div>
        <div className="post-comment">
          <div className="post-comment-icon"><i className="fas fa-comment-alt"></i></div>
          <div className="post-comment-count">{commentNum} comments</div>
        </div>
      </div>
      <div className="middle-bottom">
        <div className="like-div">
          <form onSubmit={handelLikeSubmit} className="like-form">
            <button type="submit" className={isLiked === true ? "active-like-btn" : "like-btn"}  ><i className="fas fa-thumbs-up"></i><p className="like-paragraph">Like</p></button>
          </form>
        </div>

        <div className="unlike-div">
          <form onSubmit={handleSubmitUnlike} className="unlike-form">
            <button type="submit" className={isDisliked === true ? "active-unlike-btn" : "unlike-btn"} ><i className="fas fa-thumbs-down"></i><p className="like-paragraph">Unlike</p></button>
          </form>
        </div>


        <button type="submit" className="comment-btn" onClick={handelCommentState}><i className="fas fa-comment-alt"></i><p className="like-paragraph" >Comment</p></button>
      </div>

      <div className={displayComment ? "active-bottom" : "bottom"}>
        <div className="bottom-top">
          {fetchedComments.map((el, index) => (
            <div className="comment-area" key={index}>
              <div className="comment-area-upper">
                {/* <div className="avater comment-avater"></div> */}
                <div className="comment-area-upper-left">
                  <Link className="user-name" to={`/profile/${el.profile}`} >{el.name}</Link>
                </div>
                <div className={(userID === el.user) ? "comment-area-upper-right-active" : "comment-area-upper-right"}>
                  <button className="comment-edit-btn" onClick={() => getCommentText(el._id)}><i className="fas fa-edit"></i></button>
                  <button className="comment-delete-btn" onClick={() => deleteComment(el._id)}><i className="fas fa-trash-alt"></i></button>
                </div>
              </div>
              <div className="comment-area-bottom" >
                {el.text}
              </div>
              <div className={(el._id === editedCommentId) && editState && (userID === el.user) ? "edit-comment-form-active" : "edit-comment-form"}>
                <form className="comment-form" onSubmit={handleEditSubmit}>
                  <input type="text" name="text" id="edit-comment" value={editedCommentData.text} placeholder="write a comment" onChange={handleEditComment} />
                </form>
              </div>

            </div>))}
        </div>
        <div className="bottom-bottom">
          {/* <div className="avater"></div> */}
          <div className="bottom-bottom-comment-form">
            <form className="comment-form" onSubmit={handelCommentSubmit}>
              <input type="text" name="text" id="comment" value={commentData.text} placeholder="write a comment" onChange={handleCommentChange} />
              <button type="submit" style={{ display: "none" }} ></button>
            </form>
          </div>
        </div>

      </div>

    </div>
  )
}



const mapStatetoDispach = dispatch => {
  return {
    getPosts: () => dispatch(getPosts())
  }
}




export default connect(null, mapStatetoDispach)(Post);