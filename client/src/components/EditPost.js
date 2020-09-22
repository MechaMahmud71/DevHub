import React, { useState, useEffect } from 'react'
import Nav from "./Nav";
import "../styles/EditPost.css";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";



function EditPost() {
  const [text, setText] = useState({ text: "" });
  const [isPostEdited, setIsPostEdited] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getPostText();
  }, [])

  const postId = id;


  const getPostText = async () => {
    try {
      const { data: { data: { text } } } = await axios.get(`/api/v1/post/${postId}`)
      //console.log(text);
      setText({ text: `${text}` });
    } catch (error) {
      console.log(error.message)
    }
  }

  const handlePostUpdate = async () => {
    try {
      await axios.put(`/api/v1/post/${postId}`, text);
      setIsPostEdited(true);
    } catch (error) {
      console.log(error.message)
    }
  }

  if (isPostEdited) return <Redirect to="/dashboard" />

  return (

    <>
      <Nav prop="dashboard" />
      <div className="container editpost-container">
        <div className="editpost-main">
          <div className="editpost-upper">
            <div className="edit-post-upper-upper">
              <div className="edit-create-post">Edit Post</div>
              <button className="edit-post-cancel" onClick={() => { setIsPostEdited(true) }}><i className="fas fa-times"></i></button>
            </div>
            <div className="edit-post-upper-middle">
              <div className="avater-container">
                <div className="avater"></div>
              </div>
              <div className="text-area-container">
                <textarea
                  name="text-area"
                  id="edit-text-area"
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
          <button className="edit-post-button" onClick={handlePostUpdate}>Update</button>
        </div>
      </div>
    </>
  )
}

export default EditPost
