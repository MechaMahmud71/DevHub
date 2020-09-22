import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from "./Post";
import "../styles/Loading.css";
import LoadingContent from "./LoadingContent"
import "../styles/Dashboard.css";
import Nav from "./Nav";
import { connect } from "react-redux";
import { getPosts } from "../redux/Post/postAction";



function Dashboard({ getPosts, posts, loading }) {

  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    getProfile();
    getPosts();


  }, [])


  const [text, setText] = useState({ text: "" });


  const domPost = posts.map((el, index) => <Post post={el} key={index} />);



  const handleAddPostSubmit = () => {
    submitPost();
  }

  const submitPost = async () => {
    try {
      const { data: { success } } = await axios.post("/api/v1/post", text);

      document.querySelector("#text-area").style.height = "200px"

      getPosts();
      setText({ text: "" });

    } catch (error) {
      console.log(error);
    }
  }
  const getProfile = async () => {
    try {
      const { data: { data: { _id } } } = await axios.get('/api/v1/profile/me');

      //console.log(_id);
      setProfileId(_id);
    } catch (error) {
      // setProfileId("");
      console.log(error)
    }
  }

  const expand = (e) => {
    //console.log(e.target);
    if (e.target.id === "text-area") {
      e.target.style.height = "500px"
    }
    else {
      document.querySelector("#text-area").style.height = "200px";
    }
    //const texArea = document.querySelector("#text-area").style.height = "500px";

  }

  if (loading) {
    return (
      <>
        <Nav prop="dashboard" />
        <LoadingContent />
        <LoadingContent />
      </>
    )
  }

  return (
    <>
      <Nav prop="dashboard" />
      <div className="container dashboard-container">
        {profileId.length === 0 ? (
          <>
            <div className="container error-msg">
              <p className="error-msg-text">Please create profile to add post</p>
            </div>
            {domPost}

          </>
        ) : (
            <>
              <div className="container addpost-container">

                <div className="addpost-main">
                  <div className="addpost-upper">
                    <div className="add-post-upper-upper">
                      <span className="create-post">Create Post</span>
                    </div>
                    <div className="add-post-upper-middle">
                      <div className="avater-container">
                        <div className="avater"></div>
                      </div>
                      <div className="text-area-container" onClick={expand}>
                        <textarea
                          name="text-area"
                          id="text-area"
                          cols="30"
                          rows="10"
                          placeholder="what is in your mind?"
                          value={text.text}
                          onChange={e => {
                            setText({ text: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>


                  </div>
                  <button onClick={handleAddPostSubmit} className="add-post-button">Post</button>
                </div>
              </div>
              {domPost}
            </>
          )}





      </div>
      <div className="footer" style={{ height: "50px" }}></div>
    </>
  )
}

const mapStatetoProps = state => {
  return {
    posts: state.post.post,
    loading: state.post.loading
  }
}

const mapStatetoDispach = dispatch => {
  return {
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStatetoProps, mapStatetoDispach)(Dashboard);


